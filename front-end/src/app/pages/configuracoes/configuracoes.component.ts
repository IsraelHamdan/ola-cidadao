import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CidadaoService } from '../../../services/cidadao/cidadao.service';

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.sass'
})
export class ConfiguracoesComponent {

  constructor(
    private cidadaoService: CidadaoService,
    private authService: AuthService
  ) {}

  user: boolean = false;

  onLogout(): void {
    this.authService.logout();
    this.user = false;
  }

}
