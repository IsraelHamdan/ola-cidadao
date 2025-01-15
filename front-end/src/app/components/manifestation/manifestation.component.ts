import { Component, OnInit } from '@angular/core';
import { Manifestacao } from '../../../interfaces/Manifestacao';
import { ManfestacoesService } from '../../../services/manifestacoes/manfestacoes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manifestation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manifestation.component.html',
  styleUrl: './manifestation.component.sass',
})
export class ManifestationComponent implements OnInit {
  allManifestations: Manifestacao[] = [];
  
  ngOnInit(): void {
    this.getManifestations();
  }

  constructor(private manifestacaoService: ManfestacoesService) {}

  getManifestations() {
    this.manifestacaoService.getAllManifestations().subscribe((items) => {
      this.allManifestations = items.results;
    });
  }
}
