import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../shared/models/students.model';
import { generateRandomString } from '../../../shared/utilities/utilities';

@Component({
  selector: 'app-formulario',
  standalone: false,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {
  studentsForm: FormGroup;
  courses: any[] = []; // Property to hold courses

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.studentsForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      perfil: [null, Validators.required],
      courses: [null, Validators.required], // Change to courses to handle multiple selections

      sexo: [null, Validators.required] // New field
    });

    this.loadCourses(); // Load courses on initialization
  }

  @Output() studentCreated = new EventEmitter();
  @Output() cancelEdit = new EventEmitter();
  @Input() student: Student | null = null;

  loadCourses(): void {
    this.http.get<any[]>('http://localhost:3001/courses').subscribe(data => {
      this.courses = data; // Store courses in the property
    });
  }

  isFieldRequired(fieldName: string): boolean | undefined {
    const control = this.studentsForm.get(fieldName);
    return control?.hasError('required') && control.touched;
  }

  isFieldInvalidPattern(fieldName: string): boolean | undefined {
    const control = this.studentsForm.get(fieldName);
    return control?.hasError('pattern') && control.touched;
  }

  markAsTouched(fieldName: string): void {
    const control = this.studentsForm.get(fieldName);
    control?.markAsTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['student'] && this.student) {
      this.studentsForm.patchValue(this.student);
    }
  }

  onSubmit() {
    // Ensure the student object includes perfil and sexo
    const student: Student = {
      ...this.studentsForm.value,
      courses: this.studentsForm.value.courses || [], // Include selected courses
      perfil: this.studentsForm.value.perfil || 'usuario final', // Default value if not provided
      sexo: this.studentsForm.value.sexo || 'masculino' // Default value if not provided

    };

    if (this.studentsForm.valid) {
      const student: Student = this.studentsForm.value;

      if (this.student) {
        this.studentCreated.emit({ ...this.student, ...student });
      } else {
        student.id = generateRandomString(4);
        this.studentCreated.emit(student);
      }

      this.studentsForm.reset({
        firstName: null,
        lastName: null,
        age: null,
        course: null
      }, { emitEvent: false });
    }
    Object.keys(this.studentsForm.controls).forEach(field => {
      const control = this.studentsForm.get(field);
      control?.markAsUntouched();
      control?.setErrors(null);
    });
  }
}
