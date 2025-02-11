import { Component, Input, OnInit } from '@angular/core';
import { ClasesService, Clase } from '../../core/clases.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clases',
  standalone: false,
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {
  clases: Clase[] = [];
  showForm: boolean = false;
  displayedColumns: string[] = ['name', 'acciones'];
  selectedClase: Clase = {id: '', name: '', description: ''};

  @Input() showClases: boolean = false;

  constructor(private clasesService: ClasesService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.clasesService.getClases().subscribe(data => {
      this.clases = data;
    });
  }


  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  deleteClase(clase: Clase): void {
    this.clases = this.clases.filter(c => c !== clase);
  }

  editClase(clase: Clase): void {
    this.selectedClase = clase;
    this.showForm = true;
  }saveClase(clase: Clase): void {
    if (this.selectedClase.id) {
      const index = this.clases.findIndex(c => c.id === this.selectedClase.id);
      if (index !== -1) {

        this.clases = [
          ...this.clases.slice(0, index),
          { ...this.selectedClase },
          ...this.clases.slice(index + 1)
        ];
      }
    } else {
      const newClase: Clase = { ...clase, id: new Date().toISOString() };
      this.clases = [...this.clases, newClase];
    }

    this.selectedClase = { id: '', name: '', description: '' };
    this.showForm = true;

    console.log(this.clases);
  }
}
