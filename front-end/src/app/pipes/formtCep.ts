import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep',
  standalone: true,
})
export class CepPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) {
      return '';
    }

    const cep = value.toString().replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length !== 8) {
      return value.toString(); // Retorna o valor original se não tiver 8 dígitos
    }

    return `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
  }
}
