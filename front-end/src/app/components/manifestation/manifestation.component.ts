import { Component, DoCheck, input, Input, OnInit } from '@angular/core';
import { Manifestacao } from '../../interfaces/Manifestacao';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/timeAgo';
import { NgxSpinnerService } from 'ngx-spinner';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { AuthService } from '../../services/token/auth.service';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EditManifestationComponent } from '../edit-manifestation/edit-manifestation.component';

@Component({
  selector: 'app-manifestation',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, EditManifestationComponent],
  templateUrl: './manifestation.component.html',
  styleUrl: './manifestation.component.sass',
})
export class ManifestationComponent implements OnInit {
  @Input() padding!: string;
  manifestation!: Manifestacao;

  isModalEditManifestationOpen: boolean = false;

  editarManifestation(manifestacao: Manifestacao) {
    this.isModalEditManifestationOpen = true;
    this.manifestation = manifestacao;
    console.log(manifestacao);
  }

  closeModalEditManifestation() {
    this.isModalEditManifestationOpen = false;
  }

  manifestations: Manifestacao[] = [];
  nextUrl: string | null = null;
  loading = false;

  options: boolean[] = [];

  constructor(
    private manifestacoesService: ManfestacoesService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  userLogged: boolean = false;

  ngOnInit(): void {
    // Carregar as manifestações iniciais antes de aplicar o filtro
    this.loadInitialData();

    // Obtém o valor de 'filterResponded' da rota
    const filterResponded = this.route.snapshot.data['filterResponded'];

    if (filterResponded) {
      // Filtra as manifestações com comentários após a carga inicial
      this.manifestations = this.filterManifestationsWithComments();
    }

    // Assina o evento de login para recarregar as manifestações
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

  loadInitialData(): void {
    this.loading = true;
    this.manifestacoesService.getAllManifestations().subscribe((response) => {
      this.manifestations = response.results;
      this.nextUrl = response.next;
      this.loading = false;

      this.options = new Array(this.manifestations.length).fill(false);

      // Aplica o filtro após o carregamento dos dados iniciais
      this.applyFilter();
    });
  }

  loadNextPage(): void {
    if (this.nextUrl && !this.loading) {
      this.loading = true;
      this.manifestacoesService
        .getPaginatedManifestations(this.nextUrl)
        .subscribe((response) => {
          // Carrega as novas manifestações
          const newManifestations = response.results;

          // Adiciona as novas manifestações à lista existente
          this.manifestations = [...this.manifestations, ...newManifestations];
          this.nextUrl = response.next;
          this.loading = false;

          // Expande o array options para incluir novas manifestações
          this.options = [
            ...this.options,
            ...new Array(newManifestations.length).fill(false),
          ];

          // Aplica o filtro às manifestações já carregadas (iniciais + paginadas)
          this.applyFilter();
        });
    }
  }

  // Função para aplicar o filtro de manifestações com comentários
  applyFilter(): void {
    const filterResponded = this.route.snapshot.data['filterResponded'];

    if (filterResponded) {
      this.manifestations = this.filterManifestationsWithComments();

      if (this.manifestations.length === 0 && this.nextUrl) {
        // Continua carregando páginas enquanto não encontrar manifestações respondidas
        this.loadNextPage();
      }
    }
  }

  filterManifestationsWithComments(): Manifestacao[] {
    const filtered = this.manifestations.filter(
      (manifestacao) =>
        Array.isArray(manifestacao.respostas) &&
        manifestacao.respostas.length > 0
    );
    console.log('Filtered Manifestations:', filtered); // Verifique no console
    return filtered;
  }

  like(manifestacao: Manifestacao) {
    manifestacao.liked = !manifestacao.liked;

    if (manifestacao.liked) {
      manifestacao.qtd_up++;

      if (manifestacao.disliked) {
        manifestacao.qtd_down--;
        manifestacao.disliked = false;
      }
    } else {
      manifestacao.qtd_up--;
    }
  }

  dislike(manifestacao: Manifestacao) {
    manifestacao.disliked = !manifestacao.disliked;

    if (manifestacao.disliked) {
      manifestacao.qtd_down++;

      if (manifestacao.liked) {
        manifestacao.qtd_up--;
        manifestacao.liked = false;
      }
    } else {
      manifestacao.qtd_down--;
    }
  }

  showComments(manifestacao: Manifestacao) {
    manifestacao.show = !manifestacao.show;
  }

  editManifestation(id: number, manifestacao: FormData) {
    this.manifestacoesService.editManifestation(id, manifestacao);
  }
}
