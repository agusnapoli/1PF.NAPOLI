import { Component, Input, OnInit } from '@angular/core';
import { ClasesService } from '../../core/clases.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Clase } from '../../shared/models/clase.model';

// Función para generar IDs únicos
function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}


@Component({
  selector: 'app-clases',
  standalone: false,
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {
  clases: Clase[] = [];
  showForm: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'acciones'];
  selectedClase: Clase = {id: '', name: '', description: ''};
  isAdmin$: Observable<boolean> | undefined;

  @Input() showClases: boolean = false;

  constructor(private clasesService: ClasesService,
            private cdr: ChangeDetectorRef,
            private authService: AuthService) {
    this.isAdmin$ = this.authService.getAuthUser().pipe(map((x) => x?.role === 'admin'));
  }

  ngOnInit(): void {
    this.loadClases();
  }

  private loadClases(): void {
    this.clasesService.getClases().subscribe({
      next: (data) => {
        this.clases = data;
      },
      error: (err) => {
        console.error('Error loading clases:', err);
      }
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  deleteClase(clase: Clase): void {
    this.clasesService.deleteClase(clase.id)
      .subscribe(() => {
        this.clases = this.clases.filter(c => c.id !== clase.id);
      });
  }

  editClase(clase: Clase): void {
    this.selectedClase = clase;
    this.showForm = true;
  }

  saveClase(clase: Clase): void {
    if (this.selectedClase.id) {
      this.clasesService.updateClase(this.selectedClase.id, this.selectedClase)
        .subscribe(updatedClase => {
          const index = this.clases.findIndex(c => c.id === updatedClase.id);
          if (index !== -1) {
            this.clases = [
              ...this.clases.slice(0, index),
              updatedClase,
              ...this.clases.slice(index + 1)
            ];
          }
        });
    } else {
      if (!clase.id) {
        clase.id = generateId();
      }
      this.clasesService.createClase(clase)
        .subscribe(newClase => {
          this.clases = [...this.clases, newClase];
        });

    }

    this.selectedClase = { id: '', name: '', description: '' };
    this.showForm = false;
  }
}
