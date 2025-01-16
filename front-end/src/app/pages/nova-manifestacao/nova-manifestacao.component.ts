import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/token/auth.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';

@Component({
  selector: 'app-nova-manifestacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nova-manifestacao.component.html',
  styleUrl: './nova-manifestacao.component.sass',
})
export class NovaManifestacaoComponent implements OnInit, DoCheck {
  @Input() isOpen: boolean = true;
  @Input() close: () => void = () => {};

  user!: CidadaoDTO | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  ngDoCheck(): void {
    this.user = this.authService.getUser();
  }
}
