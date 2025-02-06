import { Component } from '@angular/core';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { AuthService } from '../../services/token/auth.service';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, EditUserComponent, RouterOutlet, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  user!: CidadaoDTO | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => (this.user = user));
  }

  // ---------- EDITAR PERFIL ---------- //

  isModalEditOpen: boolean = false;

  openModal() {
    this.isModalEditOpen = true;
  }

  closeModalEdit() {
    this.isModalEditOpen = false;
  }

  edit() {
    this.isModalEditOpen = true;
  }
}
