import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../shared/models/students.model';
import { generateRandomString } from '../../../shared/utilities/utilities';

@Component({
  selector: 'app-formulario',
  standalone: false,

  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  studentsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentsForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      age: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],

      course: [null, Validators.required]
    });
  }

  @Output() studentCreated = new EventEmitter();
  @Input() student: Student | null = null;


  isFieldRequired(fieldName: string): boolean | undefined {
    const control = this.studentsForm.get(fieldName);
    return control?.hasError('required') && control.touched;
  }

  isFieldInvalidPattern(fieldName: string): boolean | undefined{
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
    if (this.studentsForm.valid) {
      const student: Student = this.studentsForm.value;

      if (this.student) {

        this.studentCreated.emit({ ...this.student, ...student });
      } else {

        student.id = generateRandomString(4);
        this.studentCreated.emit(student);
        console.log(student);
      }


      this.studentsForm.reset({
        name: null,
        lastname: null,
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

