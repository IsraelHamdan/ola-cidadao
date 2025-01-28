import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string | null): string {
    if (!value) return 'Data inválida';

    const date = new Date(value);
    const now = new Date();

    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 0) return 'Data no futuro';
    if (diff < 60) return 'há poucos segundos';
    if (diff < 3600) return `há ${Math.floor(diff / 60)} minutos`;
    if (diff < 86400) return `há ${Math.floor(diff / 3600)} horas`;
    return `há ${Math.floor(diff / 86400)} dias`;
  }
}
