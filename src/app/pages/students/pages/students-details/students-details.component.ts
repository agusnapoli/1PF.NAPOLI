import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/students.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from '../../../../shared/models/students.model';

@Component({
  selector: 'app-students-details',
  standalone: false,
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {

  isLoading = false;
  student: Student | null = null;
  errorMessage = '';




  constructor(
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.studentsService
      .getStudentById(this.activatedRoute.snapshot.params['id'])

      .subscribe({
        next: (student: Student) => {

          this.student = student;
          this.errorMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (error: HttpErrorResponse) => {

          this.isLoading = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.errorMessage = 'El estudiante no existe';
            }
          }
        },
      });
  }
}
