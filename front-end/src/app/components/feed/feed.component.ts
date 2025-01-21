import { Component } from '@angular/core';
import { ManifestationComponent } from "../manifestation/manifestation.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { PostagensComponent } from "../postagens/postagens.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.sass'
})
export class FeedComponent {
  showAppManifestacao: boolean = true;
  showAppPostagens: boolean = false;
  showAppRespostas: boolean = false;

  showManifestacoes() {
    this.showAppManifestacao = true;
    this.showAppPostagens = false;
  }

  showPostagens() {
    this.showAppPostagens = true;
    this.showAppManifestacao = false;
  }

  showRespostas() {

  }
}
