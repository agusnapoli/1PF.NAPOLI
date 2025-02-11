import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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

  constructor(private studentsService: StudentsService) { }

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

      this.students = this.students.map(s =>
        s === this.selectedStudent ? { ...s, ...student } : s
      );
    } else {

      this.students = [...this.students, student];
    }


    this.selectedStudent = null;

    console.log(this.students);
  }

  displayedColumns: string[] = ['name', 'age', 'course', 'acciones'];

  deleteStudent(student: Student) {
    this.students = this.students.filter(s => s !== student);
  }


  editStudent(student: Student): void {
    this.selectedStudent = student;
  }
}
