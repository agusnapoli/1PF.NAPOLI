import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../shared/models/students.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private apiService: ApiService) { }

  getStudents(): Observable<Student[]> {
    return this.apiService.get<Student[]>('students');
  }

  getStudentById(id: string): Observable<Student> {
    return this.apiService.get<Student>(`students/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.apiService.post<Student>('students', student);
  }

  updateStudent(id: string, student: Student): Observable<Student> {
    return this.apiService.put<Student>('students', id, student);
  }

  deleteStudent(id: string): Observable<void> {
    return this.apiService.delete<void>('students', id);
  }
}
