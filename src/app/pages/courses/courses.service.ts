import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../../shared/models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private courses: Course[] = [
    { id: '1', name: 'Course 1', description: 'Description for Course 1' },
    { id: '2', name: 'Course 2', description: 'Description for Course 2' },
    { id: '3', name: 'Course 3', description: 'Description for Course 3' }

  ];

  constructor() { }

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  updateCourse(updatedCourse: Course): void {
    const index = this.courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
      this.courses[index] = updatedCourse;
    }
  }

  deleteCourse(courseId: string): void {
    this.courses = this.courses.filter(course => course.id !== courseId);
  }
}
