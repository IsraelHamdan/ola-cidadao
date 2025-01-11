import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';
import { NovaManifestacaoComponent } from "../../pages/nova-manifestacao/nova-manifestacao.component";
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-sidebar-left',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NovaManifestacaoComponent, LoginComponent],
  templateUrl: './sidebar-left.component.html',
  styleUrl: './sidebar-left.component.sass',
})
export class SidebarLeftComponent {
  constructor(public auth: AuthService) {}
  user?: User | undefined | null;

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

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
}
