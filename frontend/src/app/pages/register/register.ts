import { Component, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  encapsulation: ViewEncapsulation.None
})
export class Register {
  username = '';
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private api: ApiService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  register() {
    this.loading = true;
    this.error = '';
    this.api.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Ошибка регистрации. Попробуйте другой логин.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
