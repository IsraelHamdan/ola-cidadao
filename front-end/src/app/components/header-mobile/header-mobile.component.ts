import { Component } from '@angular/core';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { AuthService } from '../../services/token/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NovaManifestacaoComponent } from '../../pages/nova-manifestacao/nova-manifestacao.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaManifestacaoComponent,
    CadastroComponent,
    LoginComponent,
  ],
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.sass',
})
export class HeaderMobileComponent {
  user: boolean = false;
  userCidadao!: CidadaoDTO | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.userCidadao = this.authService.getUser();
      this.user = true;
    }
  }

  ngDoCheck(): void {
    this.userCidadao = this.authService.getUser();
  }

  // ---------- NOVA MANIFESTAÇÃO ---------- //

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  // ---------- LOGIN ---------- //

  isLoginOpen: boolean = false;

  openLogin() {
    this.isLoginOpen = true;
  }
  closeLogin() {
    this.isLoginOpen = false;
  }

  onLogout(): void {
    this.authService.logout();
    this.user = false;
  }

  autorizado(isAutorizado: boolean) {
    this.user = isAutorizado;
    if (isAutorizado) {
      this.userCidadao = this.authService.getUser();
    }
  }

  // ---------- CADASTRO ---------- //

  isCadastroOpen: boolean = false;

  openCadastro() {
    this.isCadastroOpen = true;
  }
  closeCadastro() {
    this.isCadastroOpen = false;
  }
}
