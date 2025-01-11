import { Component } from '@angular/core';
import { ManifestationComponent } from '../../components/manifestation/manifestation.component';
import { CidadaoService } from '../../../services/cidadao/cidadao.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ManifestationComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass',
})
export class UserComponent {
  user!: CidadaoDTO;

  constructor(private cidadaoService: CidadaoService) {}

  // user?: User | undefined | null;

  ngOnInit(): void {
    this.cidadaoService.getCidadao(8).subscribe((user) => this.user = user);

    // this.auth.user$.subscribe((user) => {
    //   this.user = user;
    // });
  }
}
