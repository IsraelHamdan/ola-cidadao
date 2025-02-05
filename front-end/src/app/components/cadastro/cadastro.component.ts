import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CidadaoService } from '../../services/cidadao/cidadao.service';
import { CpfPipe } from '../../pipes/formtCpf';
import { CepPipe } from '../../pipes/formtCep';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CpfPipe, CepPipe],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass',
})
export class CadastroComponent {
  @Input() isOpen: boolean = false;
  @Input() close: () => void = () => {};

  @Input() isOpenCadastro: boolean = false;
  @Input() closeCadastro: () => void = () => {};

  formCadastro!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cidadaoService: CidadaoService,

    private toastr: ToastrService
  ) {}

  cpfF: string | null = '';

  ngOnInit(): void {
    this.formCadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      data_nascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      logradouro: ['', [Validators.required, Validators.minLength(2)]],
      bairro: ['', [Validators.required, Validators.minLength(2)]],
      numero: ['', Validators.required],
      cidade: ['', [Validators.required, Validators.minLength(2)]],
      estado: ['', [Validators.required, Validators.minLength(2)]],
      cep: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      imagem_perfil: [null],
      imagem_background: [null],

      confirm_password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  passwordInvalid: boolean = false;

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
        this.toastr.success('Usuário cadastrado!', 'Sucesso');
        this.formCadastro.reset();
        this.close();
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);

        this.toastr.error('CPF ou email já cadastrados', 'Erro!');
      },
    });
  }

  onCpfInput(value: string): void {
    // Remove todos os caracteres não numéricos
    const cpfNumerico = value.replace(/\D/g, '');

    // Atualiza o valor no FormControl sem formatação
    this.formCadastro.get('cpf')?.setValue(cpfNumerico);
  }

  onCepInput(value: string): void {
    // Remove todos os caracteres não numéricos
    const cepNumerico = value.replace(/\D/g, '');

    // Atualiza o valor no FormControl sem formatação
    this.formCadastro.get('cep')?.setValue(cepNumerico);
  }

  reset() {
    this.formCadastro.reset();
  }
}
