import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClasesService } from '../../../core/clases.service';
import { Clase } from '../../../shared/models/clase.model';

@Component({
  selector: 'app-clase-detail',
  standalone: false,
  templateUrl: './clase-detail.component.html',
  styleUrl: './clase-detail.component.scss'
})
export class ClaseDetailComponent implements OnInit {
  clase: Clase | undefined;

  constructor(
    private route: ActivatedRoute,
    private clasesService: ClasesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const claseId = params['id'];
      this.clasesService.getClaseById(claseId).subscribe(clase => {
        this.clase = clase;
      });
    });
  }

}
