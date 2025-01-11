import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NovaManifestacaoComponent } from '../../pages/nova-manifestacao/nova-manifestacao.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import { CidadaoService } from '../../../services/cidadao/cidadao.service';

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [RouterModule, NovaManifestacaoComponent, LoginComponent],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.sass',
})
export class SidebarLeftComponent {
  user: boolean = true;

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  // ---------- LOGIN

  isLoginOpen: boolean = true;

  openLogin() {
    this.isLoginOpen = true;
  }
  closeLogin() {
    this.isLoginOpen = false;
  }

  onLogout(): void {
    this.authService.logout();
  }

  userCidadao!: CidadaoDTO;

  constructor(
    private cidadaoService: CidadaoService,
    private authService: AuthService
  ) {}

  // user?: User | undefined | null;

  ngOnInit(): void {
    this.cidadaoService
      .getCidadao(8)
      .subscribe((user) => (this.userCidadao = user));

    // this.auth.user$.subscribe((user) => {
    //   this.user = user;
    // });
  }
}
