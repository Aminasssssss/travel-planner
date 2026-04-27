import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  encapsulation: ViewEncapsulation.None
})
export class Login {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private api: ApiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login() {
    this.loading = true;
    this.error = '';
    this.api.login(this.username, this.password).subscribe({
      next: (data: any) => {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Неверный логин или пароль';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
