import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clase } from '../shared/models/clase.model';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  constructor(private apiService: ApiService) { }


  getClases(): Observable<Clase[]> {
    return this.apiService.get<Clase[]>('classes');
  }

  getClaseById(claseId: string): Observable<Clase> {
    return this.apiService.get<Clase>(`classes/${claseId}`);
  }

  createClase(clase: Clase): Observable<Clase> {
    return this.apiService.post<Clase>('classes', clase);
  }

  updateClase(id: string, clase: Clase): Observable<Clase> {
    return this.apiService.put<Clase>('classes', id, clase);
  }

  deleteClase(id: string): Observable<void> {
    return this.apiService.delete<void>('classes', id);
  }

}
