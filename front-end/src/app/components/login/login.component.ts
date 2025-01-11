import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  @Input() isOpen: boolean = true;
  @Input() close: () => void = () => {};

  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const payload = {
      email: this.credentials.email, // Converte 'email' para 'username'
      password: this.credentials.password,
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro de login:', err);
      },
    });
  }
}
