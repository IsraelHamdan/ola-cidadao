import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Manifestacao } from '../../../interfaces/Manifestacao';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/timeAgo';
import { NgxSpinnerService } from 'ngx-spinner';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import { AuthService } from '../../services/token/auth.service';

@Component({
  selector: 'app-manifestation',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './manifestation.component.html',
  styleUrl: './manifestation.component.sass',
})
export class ManifestationComponent implements OnInit {
  @Input() padding!: string;

  manifestations: Manifestacao[] = [];
  nextUrl: string | null = null;
  loading = false;

  options: boolean[] = [];

  constructor(
    private manifestacoesService: ManfestacoesService,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {}

  userLogged: boolean = false;
  ngOnInit(): void {
    this.loadInitialData();

    this.userLogged = this.auth.isLoggedIn();
    this.auth.userLogged.subscribe(() => {
      this.loadInitialData();
      this.userLogged = this.auth.isLoggedIn();
    });

    // Inscreve-se no evento de criação para atualizar a lista automaticamente
    this.manifestacoesService.manifestationCreated.subscribe(() => {
      this.loadInitialData();
    });
  }

  loadInitialData(): void {
    this.loading = true;
    this.manifestacoesService.getAllManifestations().subscribe((response) => {
      this.manifestations = response.results;
      this.nextUrl = response.next;
      this.loading = false;

      this.options = new Array(this.manifestations.length).fill(false);
    });
  }

  loadNextPage(): void {
    if (this.nextUrl && !this.loading) {
      this.loading = true;
      this.manifestacoesService
        .getPaginatedManifestations(this.nextUrl)
        .subscribe((response) => {
          this.manifestations = [...this.manifestations, ...response.results];
          this.nextUrl = response.next;
          this.loading = false;

          // Expande o array options para incluir novas manifestações
          this.options = [
            ...this.options,
            ...new Array(response.results.length).fill(false),
          ];
        });
    }
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      this.loadNextPage();
    }
  }

  moreOptions(index: number) {
    // Fecha todas as opções antes de abrir a selecionada
    this.options = this.options.map((_, i) =>
      i === index ? !this.options[i] : false
    );
  }

  deleteManifestation(id: number) {
    this.spinner.show();

    this.manifestacoesService.deleteManifestation(id).subscribe(() => {
      this.loadInitialData();
      this.spinner.hide();
    });
  }


  like(manifestacao: Manifestacao) {
    manifestacao.liked = !manifestacao.liked;
    manifestacao.disliked = false;

    if (manifestacao.liked) {
      manifestacao.qtd_up++;

      if(manifestacao.qtd_down) {
        manifestacao.qtd_down--;
      }
    } else {
      manifestacao.qtd_up--;
    }
  }

  dislike(manifestacao: Manifestacao) {
    manifestacao.disliked = !manifestacao.disliked;
    manifestacao.liked = false;

    if (manifestacao.disliked) {
      manifestacao.qtd_down++;

      if(manifestacao.qtd_up) {
        manifestacao.qtd_up--;
      }
    } else {
      manifestacao.qtd_down--;
    }
  }

  showComments(manifestacao: Manifestacao) {
    manifestacao.show = !manifestacao.show;
  }
}
