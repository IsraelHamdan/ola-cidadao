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

  @Output() autorizacao: EventEmitter<boolean> = new EventEmitter(); // Expor com @Output

  userAutorizado: boolean = true;

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
        this.close();
        this.autorizacao.emit(true);
      },
      error: (err) => {
        console.error('Erro de login:', err);
        this.autorizacao.emit(false);
      },
    });
  }
}
