import { Component, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/token/auth.service';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/timeAgo';
import { Postagens } from '../../interfaces/Postagens';
import { PostagensService } from '../../services/postagens/postagens.service';

@Component({
  selector: 'app-postagens',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './postagens.component.html',
  styleUrl: './postagens.component.sass',
})
export class PostagensComponent {
  @Input() padding!: string;

  postagens: Postagens[] = [];
  nextUrl: string | null = null;
  loading = false;
  options: boolean[] = [];

  userLogged: boolean = false;

  constructor(
    private postagensService: PostagensService,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();

    this.userLogged = this.auth.isLoggedIn();
    this.auth.userLogged.subscribe(() => {
      this.loadInitialData();
      this.userLogged = this.auth.isLoggedIn();
    });

    // Inscreve-se no evento de criação para atualizar a lista automaticamente
    this.postagensService.postagemCreated.subscribe(() => {
      this.loadInitialData();
    });
  }

  loadInitialData(): void {
    this.loading = true;
    this.postagensService.getAllPostagens().subscribe((response) => {
      this.postagens = response.results;
      this.nextUrl = response.next;
      this.loading = false;

      this.options = new Array(this.postagens.length).fill(false);
    });
  }

  loadNextPage(): void {
    if (this.nextUrl && !this.loading) {
      this.loading = true;
      this.postagensService
        .getPaginatedPostagens(this.nextUrl)
        .subscribe((response) => {
          this.postagens = [...this.postagens, ...response.results];
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

  deletePostagem(id: number) {
    this.spinner.show();

    this.postagensService.deletePostagem(id).subscribe(() => {
      this.loadInitialData();
      this.spinner.hide();
    });
  }

  like(postagem: Postagens) {
    postagem.liked = !postagem.liked;
    postagem.disliked = false;
  }

  dislike(postagem: Postagens) {
    postagem.disliked = !postagem.disliked;
    postagem.liked = false;
  }
}
