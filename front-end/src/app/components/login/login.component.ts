import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() isOpen: boolean = false;
  @Input() close: () => void = () => {};

  @Output() autorizacao: EventEmitter<boolean> = new EventEmitter();

  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access);
        this.close();
        this.autorizacao.emit(true);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.autorizacao.emit(false);
      },
    });
  }
}
