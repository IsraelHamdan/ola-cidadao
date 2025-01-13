import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NovaManifestacaoComponent } from '../../pages/nova-manifestacao/nova-manifestacao.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import { CidadaoService } from '../../../services/cidadao/cidadao.service';
import { CadastroComponent } from '../cadastro/cadastro.component';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [
    RouterModule,
    NovaManifestacaoComponent,
    LoginComponent,
    CadastroComponent,
  ],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.sass',
})
export class SidebarLeftComponent {
  user: boolean = false;

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  // ---------- LOGIN

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

  userCidadao!: CidadaoDTO | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  autorizado(isAutorizado: boolean) {
    this.user = isAutorizado;
    if (isAutorizado) {
      this.userCidadao = this.authService.getUser();

      const user = this.authService.getUser();
      if (user) {
        this.user = true; // Define que o usuário está logado
        this.userCidadao = user; // Carrega os dados do usuário
      }
    }
  }

  // CADASTRO

  isCadastroOpen: boolean = false;

  openCadastro() {
    this.isCadastroOpen = true;
  }
  closeCadastro() {
    this.isCadastroOpen = false;
  }
}
