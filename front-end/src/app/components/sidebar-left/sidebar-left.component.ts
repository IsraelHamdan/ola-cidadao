import {
  ChangeDetectorRef,
  Component,
  OnInit,
  OnDestroy,
  DoCheck,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaManifestacaoComponent } from '../../pages/nova-manifestacao/nova-manifestacao.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../services/auth.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { Subscription } from 'rxjs';

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
export class SidebarLeftComponent implements OnInit, OnDestroy, DoCheck {
  user: boolean = false;
  userCidadao!: CidadaoDTO | undefined | null;

  isModalOpen: boolean = false;
  isLoginOpen: boolean = false;
  isCadastroOpen: boolean = false;

  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe((user) => {
      this.userCidadao = user;
      this.user = !!user;
      this.cd.detectChanges();
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = true;
    }
  }

  ngDoCheck(): void {
    this.userCidadao = this.authService.getUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openLogin() {
    this.isLoginOpen = true;
  }

  closeLogin() {
    this.isLoginOpen = false;
  }

  openCadastro() {
    this.isCadastroOpen = true;
  }

  closeCadastro() {
    this.isCadastroOpen = false;
  }

  onLogout(): void {
    this.authService.logout();
    this.user = false;
    this.userCidadao = null;
  }

  autorizado(isAutorizado: boolean): void {
    this.user = isAutorizado;
    if (isAutorizado) {
      this.userCidadao = this.authService.getUser();
    } else {
      this.userCidadao = null;
    }
  }
}
