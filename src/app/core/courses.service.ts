import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../shared/models/courses.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private apiService: ApiService) { }


  getCourses(): Observable<Course[]> {
    return this.apiService.get<Course[]>('courses');
  }

  getCourseDetail(id: string): Observable<Course> {
    return this.apiService.get<Course>(`courses/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.apiService.post<Course>('courses', course);
  }

  updateCourse(id: string, course: Course): Observable<Course> {
    return this.apiService.put<Course>('courses', id, course);
  }


  deleteCourse(id: string): Observable<void> {
    return this.apiService.delete<void>('courses', id);
  }


}
