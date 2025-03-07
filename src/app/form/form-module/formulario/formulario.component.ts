import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select'; // Importar MatSelectChange
import { EnrollmentService } from '../../../pages/enrollments/enrollments.service';
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
  studentId: string | null = null; // Propiedad para almacenar el ID del estudiante
  initialCourses: string[] = []; // Para almacenar los cursos iniciales del estudiante

  constructor(private fb: FormBuilder, private http: HttpClient, private enrollmentService: EnrollmentService) {
    this.studentsForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      age: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      perfil: [null, Validators.required],
      courses: [[]], // Change to courses to handle multiple selections and make it optional
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
      const studentCourses = this.student.courses || [];  // Si es un array de IDs, no se necesita mapear

      this.studentsForm.patchValue({
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        age: this.student.age,
        perfil: this.student.perfil,
        courses: studentCourses  // Asigna directamente los IDs de los cursos
      });

      this.studentId = this.student.id;
      this.initialCourses = studentCourses;  // Guarda los IDs directamente
    }
  }


  removeCourse(event: MatSelectChange): void { // Método para eliminar un curso y la inscripción correspondiente
    const currentCourses = this.initialCourses; // Cursos inicialmente registrados
    const newCourses = event.value || []; // Nuevos cursos seleccionados

    // Determinar el curso que se ha deseleccionado
    const deselectedCourseId = currentCourses.find(course => !newCourses.includes(course));

    console.log('Deselected Course ID:', deselectedCourseId);
    console.log('Student ID:', this.studentId); // Log para depuración

    if (this.studentId && deselectedCourseId) { // Verificar si el ID del estudiante y el curso deseleccionado están disponibles
      this.enrollmentService.getEnrollments().subscribe((enrollments: any[]) => { // Obtener inscripciones
        const enrollmentToDelete = enrollments.find((enrollment: any) => enrollment.studentId === this.studentId && enrollment.courseId === deselectedCourseId); // Buscar inscripción

        if (enrollmentToDelete) {
          console.log('Eliminando inscripción:', enrollmentToDelete.id); // Log para depuración
          this.enrollmentService.deleteEnrollment(enrollmentToDelete.id).subscribe({
            next: () => {
              console.log('Inscripción eliminada:', enrollmentToDelete.id);
            },
            error: (err: any) => { // Manejar error
              console.error('Error deleting enrollment:', err);
            }
          });
        }
      });
    }

    // Actualizar la lista de cursos en el formulario
    this.studentsForm.patchValue({
      courses: newCourses // Actualizar con los nuevos cursos seleccionados
    });
  }

  onSubmit() {
    const student: Student = {
      ...this.studentsForm.value,
      courses: this.studentsForm.value.courses || [],
      perfil: this.studentsForm.value.perfil || 'usuario final',
      sexo: this.studentsForm.value.sexo || 'masculino'
    };

    if (this.studentsForm.valid) {
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
        course: []
      }, { emitEvent: false });
    }
    Object.keys(this.studentsForm.controls).forEach(field => {
      const control = this.studentsForm.get(field);
      control?.markAsUntouched();
      control?.setErrors(null);
    });
  }
}
