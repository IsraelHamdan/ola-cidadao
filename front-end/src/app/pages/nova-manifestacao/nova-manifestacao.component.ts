import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nova-manifestacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nova-manifestacao.component.html',
  styleUrl: './nova-manifestacao.component.sass',
})
export class NovaManifestacaoComponent implements OnInit {
  @Input() isOpen: boolean = true;
  @Input() close: () => void = () => {};

  user?: User | undefined | null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
