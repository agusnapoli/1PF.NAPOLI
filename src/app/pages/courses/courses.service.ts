import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../../shared/models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable<Course[]> {
    const courses: Course[] = [
      { id: '1', name: 'Course 1', description: 'Description for Course 1' },
      { id: '2', name: 'Course 2', description: 'Description for Course 2' },
      { id: '3', name: 'Course 3', description: 'Description for Course 3' }

    ];
      return of(courses);
    }

}
