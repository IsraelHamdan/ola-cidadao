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

      logradouro: [''],
      bairro: [''],
      numero: [''],
    });

    this.user = this.authService.getUser();

    this.formUserEdit.setValue({
      nome: this.user.nome,
      email: this.user.email,
      data_nascimento: this.user.data_nascimento,

      logradouro: this.user.endereco.logradouro,
      bairro: this.user.endereco.bairro,
      numero: this.user.endereco.numero,
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cidadaoService: CidadaoService
  ) {}

  onSubmit() {
    const updateData = this.formUserEdit.value;

    const cidadaoPatch: Partial<CidadaoDTO> = {
      nome: updateData.nome,
      email: updateData.email,
      data_nascimento: updateData.data_nascimento,

      endereco: {
        logradouro: updateData.logradouro,
        bairro: updateData.bairro,
        numero: updateData.numero,

        cidade: this.user.endereco.cidade, 
        estado: this.user.endereco.estado, 
        cep: this.user.endereco.cep,
      },
    };

    this.cidadaoService.updateCidadao(this.user.id, cidadaoPatch).subscribe({
      next: (response) => {
        console.log('Usuário atualizado');

        // Atualiza o localStorage com os novos dados do usuário
        const updatedUser = { ...this.user, ...response };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Atualiza o usuário local para refletir os dados novos na interface
        this.user = updatedUser;
        this.cidadaoService.userUpdated.emit();

        this.close();
      },
      error: (err) => {
        console.log('Erro ao atualizar informações', err);
      },
    });
  }
}
