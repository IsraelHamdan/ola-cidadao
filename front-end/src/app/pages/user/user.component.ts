import { Component } from '@angular/core';
import { ManifestationComponent } from '../../components/manifestation/manifestation.component';
import { CidadaoService } from '../../services/cidadao/cidadao.service';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { AuthService } from '../../services/token/auth.service';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from '../../components/edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ManifestationComponent, CommonModule, EditUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  user!: CidadaoDTO | undefined | null;

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

  constructor(
    private authService: AuthService,
    private cidadaoService: CidadaoService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.cidadaoService.userUpdated.subscribe(() => {
      this.user = this.authService.getUser();
    });
  }

  // constructor(private cidadaoService: CidadaoService) {}

  // // user?: User | undefined | null;

  // ngOnInit(): void {
  //   this.cidadaoService.getCidadao(1).subscribe((user) => (this.user = user));

  //   // this.auth.user$.subscribe((user) => {
  //   //   this.user = user;
  //   // });
  // }
}
