import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Manifestacao } from '../../../interfaces/Manifestacao';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manifestation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manifestation.component.html',
  styleUrl: './manifestation.component.sass',
})
export class ManifestationComponent implements OnInit {
  @Input() padding!: string;
  // allManifestations: Manifestacao[] = [];

  // ngDoCheck(): void {
  //   this.loadInitialData();
  // }

  nextUrl: string | null = null;
  loading = false;

  constructor(private manifestacoesService: ManfestacoesService) {}

  ngOnInit(): void {
    // console.log('Componente inicializado');
    this.loadInitialData();
  }

  manifestations: Manifestacao[] = [];

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
      // console.log('Carregando próxima página:', this.nextUrl);
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
    //console.log('ScrollTop:', target.scrollTop);
    // console.log('ScrollHeight:', target.scrollHeight);
    // console.log('ClientHeight:', target.clientHeight);

    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
      this.loadNextPage();
    }
  }
}
