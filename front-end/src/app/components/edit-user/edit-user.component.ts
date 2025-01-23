import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/token/auth.service';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { CidadaoService } from '../../services/cidadao/cidadao.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.sass',
})
export class EditUserComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() close: () => void = () => {};

  formUserEdit!: FormGroup;
  user!: CidadaoDTO;

  ngOnInit(): void {
    this.formUserEdit = this.fb.group({
      nome: [''],
      email: [''],
      data_nascimento: [''],
      telefone: [''],
      imagem_perfil: [null],
      imagem_background: [null],

      logradouro: [''],
      bairro: [''],
      numero: [''],
      cidade: [''],
      estado: [''],
      cep: [''],
    });

    this.user = this.authService.getUser();

    this.formUserEdit.setValue({
      nome: this.user.nome,
      email: this.user.email,
      data_nascimento: this.user.data_nascimento,
      telefone: this.user.telefone,
      imagem_perfil: null,
      imagem_background: null,

      logradouro: this.user.endereco.logradouro,
      bairro: this.user.endereco.bairro,
      numero: this.user.endereco.numero,
      estado: this.user.endereco.estado,
      cidade: this.user.endereco.cidade,
      cep: this.user.endereco.cep,
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cidadaoService: CidadaoService,
    private spinner: NgxSpinnerService
  ) {}

  onSubmit() {
    this.spinner.show();

    const formValue = this.formUserEdit.value;
    const formData = new FormData();

    // Dados básicos
    formData.append('nome', formValue.nome);
    formData.append('data_nascimento', formValue.data_nascimento);
    formData.append('email', formValue.email);
    formData.append('telefone', formValue.telefone);

    const imagemPerfilInput = (
      document.getElementById('imagem_perfil') as HTMLInputElement
    ).files;

    if (imagemPerfilInput && imagemPerfilInput.length > 0) {
      formData.append('imagem_perfil', imagemPerfilInput[0]);
    }

    const imagemBackgroundInput = (
      document.getElementById('imagem_background') as HTMLInputElement
    ).files;

    if (imagemBackgroundInput && imagemBackgroundInput.length > 0) {
      formData.append('imagem_background', imagemBackgroundInput[0]);
    }

    //

    formData.append('endereco.logradouro', formValue.logradouro);
    formData.append('endereco.bairro', formValue.bairro);
    formData.append('endereco.numero', formValue.numero);
    formData.append('endereco.cidade', formValue.cidade);
    formData.append('endereco.estado', formValue.estado);
    formData.append('endereco.cep', formValue.cep);

    this.cidadaoService.updateCidadao(this.user.id, formData).subscribe({
      next: (response) => {
        console.log('Usuário atualizado', response);
        console.log('formData: ', formData);

        // Atualiza o localStorage com os novos dados do usuário
        const updatedUser = { ...this.user, ...response };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Atualiza o usuário local para refletir os dados novos na interface
        this.user = updatedUser;
        this.cidadaoService.userUpdated.emit();
        this.close();
        this.spinner.hide();
      },
      error: (err) => {
        console.log('Erro ao atualizar informações', err);
        console.log('formData: ', formData);
        this.spinner.hide();
      },
    });
  }
}
