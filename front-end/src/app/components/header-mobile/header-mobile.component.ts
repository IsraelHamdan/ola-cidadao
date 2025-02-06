import { Component } from '@angular/core';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { AuthService } from '../../services/token/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NovaManifestacaoComponent } from '../../pages/nova-manifestacao/nova-manifestacao.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
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
  userCidadao!: CidadaoDTO | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.userCidadao = user;
    });
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
