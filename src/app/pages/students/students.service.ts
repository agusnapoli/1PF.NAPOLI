import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Student } from '../../shared/models/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  // Método que devuelve un observable con datos mockeados
  getStudents(): Observable<Student[]> {
    const mockStudents: Student[] = [
      { id: '1', name: 'Juan', lastname: 'Pérez', age: 20, course: 'Matemáticas' },
      { id: '2', name: 'Ana', lastname: 'Gómez', age: 22, course: 'Física' },
      { id: '3', name: 'Luis', lastname: 'Rodríguez', age: 21, course: 'Química' }

    ];
    return of(mockStudents);
  }
}
