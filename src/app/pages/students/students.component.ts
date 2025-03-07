import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StudentsService } from '../../core/students.service';
import { Student } from '../../shared/models/students.model';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  showForm: boolean = false;
  @Input() showStudents: boolean = false;
  students: Student[] = [];
  selectedStudent: Student | null = null;

  isAdmin$: Observable<boolean>; // Check if the user is an admin

  constructor(private studentsService: StudentsService, private authService: AuthService) {
    this.isAdmin$ = this.authService.getAuthUser().pipe(map((user) => user?.role === 'admin'));
  }


  ngOnInit(): void {
    this.studentsService.getStudents().subscribe(data => {
      this.students = data;
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  addStudent(student: Student) {


    if (this.selectedStudent) {
      this.studentsService.updateStudent(this.selectedStudent.id!, student)
        .subscribe({
          next: (updatedStudent) => {
            this.students = this.students.map(s =>
              s.id === updatedStudent.id ? updatedStudent : s
            );
            this.cancelEdit();
          },
          error: (err) => {
            console.error('Error updating student:', err);
          }
        });
    } else {
      this.studentsService.createStudent(student)
        .subscribe({
          next: (newStudent) => {
            this.students = [...this.students, newStudent];
            this.cancelEdit();
          },
          error: (err) => {
            console.error('Error creating student:', err);
          }
        });
    }
  }

  displayedColumns: string[] = ['name', 'age', 'course', 'acciones'];

  deleteStudent(student: Student): void {

    if (student.id) {
      this.studentsService.deleteStudent(student.id)
        .subscribe({
          next: () => {
            this.students = this.students.filter(s => s.id !== student.id);
          },
          error: (err) => {
            console.error('Error deleting student:', err);
          }
        });
    }
  }

  editStudent(student: Student): void {
    this.selectedStudent = student;
    this.showForm = true;


    this.showForm = true;
  }



  cancelEdit(): void {

    this.selectedStudent = null;
    this.showForm = false;
  }
}
