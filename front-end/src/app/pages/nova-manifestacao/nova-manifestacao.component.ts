import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/token/auth.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';

@Component({
  selector: 'app-nova-manifestacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './nova-manifestacao.component.html',
  styleUrl: './nova-manifestacao.component.sass',
})
export class NovaManifestacaoComponent implements OnInit, DoCheck {
  @Input() isOpen: boolean = true;
  @Input() close: () => void = () => {};

  user!: CidadaoDTO | undefined | null;
  formNovaManifestacao!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private manifestacaoService: ManfestacoesService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.formNovaManifestacao = this.fb.group({
      conteudo: [''],
      nome_orgao: [''],
      tipo: [''],
      imagem: [null],
    });
  }

  ngDoCheck(): void {
    this.user = this.authService.getUser();
  }

  anexar() {
    const inputFile = document.getElementById('manifestacao-image');
    inputFile!.click();
  }

  onSubmit(): void {
    const formValue = this.formNovaManifestacao.value;
    const formData = new FormData();

    const user: CidadaoDTO = JSON.parse(localStorage.getItem('user')!);
    const nome_cidadao = user.nome;

    formData.append('conteudo', formValue.conteudo);
    formData.append('nome_orgao', formValue.nome_orgao);
    formData.append('nome_cidadao', nome_cidadao);
    formData.append('orgao', '1');
    formData.append('tipo', formValue.tipo);

    const imageManifestacaoInput = (
      document.getElementById('manifestacao-image') as HTMLInputElement
    ).files;

    if (imageManifestacaoInput && imageManifestacaoInput.length > 0) {
      formData.append('imagem', imageManifestacaoInput[0]);
    }

    this.manifestacaoService.createManifestation(formData).subscribe({
      next: (res) => {
        console.log('Manifestacao criada com sucesso!', res);
        this.formNovaManifestacao.reset();
        this.close();
        
      },
      error: (err) => console.error('Erro na crição de manifestação', err),
    });
  }
}
