import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { StudentsService } from './students.service';
import { Student } from '../../shared/models/students.model';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  showForm: boolean = false;
  @Input() showStudents: boolean = false; // Recibe el estado desde el componente padre
  students: Student[] = []; // Lista de estudiantes
  selectedStudent: Student | null = null; // Estudiante seleccionado para edición

  constructor(private studentsService: StudentsService) { } // Inyección del servicio

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe(data => {
      this.students = data; // Asignar los datos obtenidos al arreglo de estudiantes
    });
  }

  // Método que alterna la visibilidad del formulario
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Método que agrega un estudiante a la lista
  addStudent(student: Student) {
    if (this.selectedStudent) {
      // Si ya hay un estudiante seleccionado, actualiza los datos del estudiante
      this.students = this.students.map(s =>
        s === this.selectedStudent ? { ...s, ...student } : s
      );
    } else {
      // Si no hay estudiante seleccionado, agrega uno nuevo
      this.students = [...this.students, student];
    }

    // Resetea el estudiante seleccionado para que no se mantenga editando el mismo
    this.selectedStudent = null;

    console.log(this.students);
  }

  displayedColumns: string[] = ['name', 'age', 'course', 'acciones'];

  deleteStudent(student: Student) {
    this.students = this.students.filter(s => s !== student);
  }

  // Método para seleccionar un estudiante y enviarlo al formulario
  editStudent(student: Student): void {
    this.selectedStudent = student;
  }
}
