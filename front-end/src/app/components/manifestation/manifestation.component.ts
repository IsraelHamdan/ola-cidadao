import { Component, Input, OnInit } from '@angular/core';
import { Manifestacao } from '../../../interfaces/Manifestacao';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/timeAgo';

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

  constructor(private manifestacoesService: ManfestacoesService) {}

  ngOnInit(): void {
    this.loadInitialData();

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
        });
    }
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      this.loadNextPage();
    }
  }
}
