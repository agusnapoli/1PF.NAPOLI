import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users-details',
  standalone: false,
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {
  isLoading = false;
  userDetails: User | null = null; // Cambiar el tipo según tu modelo de usuario
  errorMessage: string = ''; // Para manejar mensajes de error

  constructor(private route: ActivatedRoute, private userService: UsersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUserById(this.route.snapshot.params['id']).subscribe({
      next: (user: User) => {
        this.userDetails = user;
        this.errorMessage = '';
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            this.errorMessage = 'El usuario no existe';
          }
        }
      },
    });
  }
}
