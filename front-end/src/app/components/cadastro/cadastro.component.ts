import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/token/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { tick } from '@angular/core/testing';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import { CidadaoService } from '../../services/cidadao/cidadao.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass',
})
export class CadastroComponent {
  @Input() isOpen: boolean = false;
  @Input() close: () => void = () => {};

  formCadastro!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cidadaoService: CidadaoService
  ) {}

  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      numero: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      imagem_perfil: [null],
      imagem_background: [null],

      confirm_password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const formValue = this.formCadastro.value;
    const formData = new FormData();

    // Dados básicos
    formData.append('nome', formValue.nome);
    formData.append('cpf', formValue.cpf);
    formData.append('data_nascimento', formValue.data_nascimento);
    formData.append('email', formValue.email);
    formData.append('telefone', formValue.telefone);
    formData.append('password', formValue.password);

    // Imagens
    const imagemPerfilInput = (
      document.getElementById('imagem_perfil') as HTMLInputElement
    ).files;
    const imagemBackgroundInput = (
      document.getElementById('imagem_background') as HTMLInputElement
    ).files;

    if (imagemPerfilInput && imagemPerfilInput.length > 0) {
      formData.append('imagem_perfil', imagemPerfilInput[0]);
    }

    if (imagemBackgroundInput && imagemBackgroundInput.length > 0) {
      formData.append('imagem_background', imagemBackgroundInput[0]);
    }

    // Endereço
    formData.append('endereco.logradouro', formValue.logradouro);
    formData.append('endereco.bairro', formValue.bairro);
    formData.append('endereco.numero', formValue.numero);
    formData.append('endereco.cidade', formValue.cidade);
    formData.append('endereco.estado', formValue.estado);
    formData.append('endereco.cep', formValue.cep);

    this.cidadaoService.createCidadao(formData).subscribe({
      next: (res) => {
        console.log('Cadastro realizado com sucesso!', res);
        this.formCadastro.reset();
      },
      error: (err) => console.error('Erro no cadastro:', err),
    });
  }
}
