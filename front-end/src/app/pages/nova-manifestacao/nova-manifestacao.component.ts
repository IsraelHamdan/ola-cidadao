import { CommonModule } from '@angular/common';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/token/auth.service';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SecretariasService } from '../../services/secretarias/secretarias.service';
import { Secretaria } from '../../../interfaces/SecretariaDTO';

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

  conteudoLength: string = '';
  secretarias: Secretaria[] = [];

  user!: CidadaoDTO | undefined | null;
  formNovaManifestacao!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private manifestacaoService: ManfestacoesService,
    private spinner: NgxSpinnerService,
    private secretariaService: SecretariasService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.formNovaManifestacao = this.fb.group({
      conteudo: ['', [Validators.required]],
      orgao: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      imagem: [null],
    });

    this.secretariaService.getAllSecretarias().subscribe((response) => {
      this.secretarias = response.results;
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
    this.spinner.show();

    const formValue = this.formNovaManifestacao.value;
    const formData = new FormData();

    const user: CidadaoDTO = JSON.parse(localStorage.getItem('user')!);
    const nome_cidadao = user.nome;
    let now = new Date();
    let data_criacao = now.toISOString();

    formData.append('data_criacao', data_criacao);
    formData.append('conteudo', formValue.conteudo);
    formData.append('orgao', formValue.orgao);
    formData.append('nome_cidadao', nome_cidadao);
    formData.append('tipo', formValue.tipo);

    const imageManifestacaoInput = (
      document.getElementById('manifestacao-image') as HTMLInputElement
    ).files;

    if (imageManifestacaoInput && imageManifestacaoInput.length > 0) {
      formData.append('imagem', imageManifestacaoInput[0]);
    }

    this.manifestacaoService.createManifestation(formData).subscribe({
      next: (res) => {
        console.log('Manifestação criada com sucesso!', res);
        this.formNovaManifestacao.reset();
        this.close();
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Erro na criação de manifestação', err);
        this.spinner.hide();
      },
    });
  }
}
