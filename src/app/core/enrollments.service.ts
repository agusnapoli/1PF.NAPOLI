import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from '../pages/enrollments/models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3001/enrollments';

  constructor(private http: HttpClient) {}

  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  deleteEnrollment(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    enrollment.enrollmentDate = new Date();
    return this.http.post<Enrollment>(this.apiUrl, enrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollment.id}`, enrollment);
  }

  getEnrollmentById(id: string): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.apiUrl}/${id}`);
  }
}
