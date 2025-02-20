import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../../core/courses.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../../../shared/models/courses.model';


@Component({
  selector: 'app-courses-details',
  standalone: false,
  templateUrl: './courses-details.component.html',
  styleUrl: './courses-details.component.scss'
})
export class CoursesDetailsComponent implements OnInit
 {

  isLoading = false;
  course: Course | null | undefined = null;

  errorMessage = '';

  constructor(
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService
      .getCourseDetail(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
          this.course = course;
          this.errorMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;

          if (error instanceof HttpErrorResponse) {
            if (error.status === 404) {
              this.errorMessage = 'El curso no existe';
            }
          }
        },
      });
  }
}
