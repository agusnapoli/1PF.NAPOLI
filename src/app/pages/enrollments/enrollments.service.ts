import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enrollment } from './models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:3001/enrollments';

  constructor(private http: HttpClient) {}

  // Obtener todas las inscripciones
  getEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  // Agregar una nueva inscripción
  deleteEnrollment(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, enrollment); // Enviar la inscripción al API
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollment.id}`, enrollment);
  }


}
