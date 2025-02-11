import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../shared/models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable<Course[]> {
    const courses: Course[] = [
      { id: '1', name: 'Curso 1', description: 'Descripcion curso 1' },
      { id: '2', name: 'Curso 2', description: 'Descripcion curso 2' },
      { id: '3', name: 'Curso 3', description: 'Descripcion curso 3' }

    ];
      return of(courses);
    }

}
