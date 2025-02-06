import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/token/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  @Input() isOpen: boolean = false;
  @Input() close: () => void = () => {};
  @Output() autorizacao: EventEmitter<boolean> = new EventEmitter();

  formLogin!: FormGroup;
  alert: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,

    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [localStorage.getItem('email') || ''],
      senha: [localStorage.getItem('senha') || ''],
      remenber: [!!localStorage.getItem('email')], // Define o estado inicial do checkbox
    });
  }

  onSubmit() {
    const { email, senha, remenber } = this.formLogin.value;

    const payload = {
      email,
      password: senha,
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access);

        if (remenber) {
          localStorage.setItem('email', email);
          localStorage.setItem('senha', senha);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('senha');
        }

        this.authService.getUser();

        this.router.navigate(['/dashboard']);
        this.close();
        // this.autorizacao.emit(true);
      },
      error: (err) => {
        console.error('Erro de login:', err);
        // this.autorizacao.emit(false);
        this.alert = true;
      },
    });
  }
}
