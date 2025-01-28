import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NovaManifestacaoComponent } from '../../pages/nova-manifestacao/nova-manifestacao.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/token/auth.service';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [
    RouterModule,
    NovaManifestacaoComponent,
    LoginComponent,
    CadastroComponent,
    CommonModule,
  ],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.sass',
})
export class SidebarLeftComponent {
  userCidadao!: CidadaoDTO | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const expirationTime = this.authService.getTokenExpiration();
      const currentTime = new Date().getTime();

      if (expirationTime && expirationTime > currentTime) {
        this.userCidadao = this.authService.getUser();
        this.user = true;
        this.authService.startTokenExpirationTimer(); // Configura o temporizador no carregamento
      } else {
        this.onLogout(); // Desloga se o token já expirou
      }
    }
  }

  ngDoCheck(): void {
    this.userCidadao = this.authService.getUser();
  }

  autorizado(isAutorizado: boolean) {
    this.user = isAutorizado;
    if (isAutorizado) {
      this.userCidadao = this.authService.getUser();
    }
  }

  // ---------- NOVA MANIFESTAÇÃO ---------- //

  user: boolean = false;

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

  // ---------- CADASTRO ---------- //

  isCadastroOpen: boolean = false;

  openCadastro() {
    this.isCadastroOpen = true;
  }
  closeCadastro() {
    this.isCadastroOpen = false;
  }
}
