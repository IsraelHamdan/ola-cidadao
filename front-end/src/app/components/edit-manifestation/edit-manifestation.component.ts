import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ManfestacoesService } from '../../services/manifestacoes/manfestacoes.service';
import { Manifestacao } from '../../interfaces/Manifestacao';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-manifestation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-manifestation.component.html',
  styleUrl: './edit-manifestation.component.sass',
})
export class EditManifestationComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() close: () => void = () => {};
  @Input() manifestation!: Manifestacao;

  manifestacaoCurrent!: Manifestacao;
  formManifestationEdit!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private manifestationService: ManfestacoesService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.formManifestationEdit = this.fb.group({
      conteudo: [''],
      imagem: [null],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifestation'] && this.manifestation) {
      this.formManifestationEdit.setValue({
        conteudo: this.manifestation.conteudo || '',
        imagem: null,
      });
    }
  }

  onSubmit() {
    this.spinner.show();

    const formValue = this.formManifestationEdit.value;
    const formData = new FormData();

    formData.append('conteudo', formValue.conteudo);

    const imagemInput = (document.getElementById('imagem') as HTMLInputElement)
      .files;

    if (imagemInput && imagemInput.length > 0) {
      formData.append('imagem', imagemInput[0]);
    }

    this.manifestationService
      .editManifestation(this.manifestation.id, formData)
      .subscribe({
        next: (response) => {
          console.log('Atulizado', response);
          this.manifestationService.manifestationCreated.emit();
          this.close();
          this.spinner.hide();
        },
        error: (err) => {
          console.log('Erro na atualizacao:', err);
          this.spinner.hide();
        },
      });
  }

  alterarImagem() {
    const inputChangeImage = document.getElementById('imagem');
    inputChangeImage!.click();
  }
}
