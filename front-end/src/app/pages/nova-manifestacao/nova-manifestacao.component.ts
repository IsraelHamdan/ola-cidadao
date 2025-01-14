import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';

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

  user?: CidadaoDTO | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    // this.auth.user$.subscribe((user) => {
    //   this.user = user;
    // });
  }
}
