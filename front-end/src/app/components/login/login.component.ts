import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User, AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent {
  @Input() isOpen: boolean = true;
  @Input() close: () => void = () => {};

  user?: User | undefined | null;

  constructor() {}

  ngOnInit(): void {}
}
