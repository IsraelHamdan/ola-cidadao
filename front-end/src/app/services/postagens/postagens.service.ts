import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponsePostagens } from '../../interfaces/ResponsePostagens';
import { Postagens } from '../../interfaces/Postagens';
import { Manifestacao } from '../../interfaces/Manifestacao';
import { ResponseManifestacao } from '../../interfaces/ResponseManifestacao';

@Injectable({
  providedIn: 'root',
})
export class PostagensService {
  private baseApiUrl = environment.baseURL;
  private apiUrl = `${this.baseApiUrl}/postagens`;

  // Emissor de eventos para notificações de novas manifestações
  postagemCreated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  // Obtém todas as manifestações
  getAllPostagens(): Observable<ResponsePostagens<Postagens[]>> {
    return this.http.get<ResponsePostagens<Postagens[]>>(`${this.apiUrl}/`);
  }

  // Obtém manifestações paginadas
  getPaginatedPostagens(
    url: string
  ): Observable<ResponsePostagens<Postagens[]>> {
    return this.http.get<ResponsePostagens<Postagens[]>>(url);
  }

  // Cria uma nova manifestação e emite um evento ao concluir
  // createManifestation(manifestacao: FormData): Observable<any> {
  //   return new Observable((observer) => {
  //     this.http.post(`${this.apiUrl}/`, manifestacao).subscribe({
  //       next: (res) => {
  //         this.manifestationCreated.emit(); // Notifica a criação
  //         observer.next(res);
  //         observer.complete();
  //       },
  //       error: (err) => observer.error(err),
  //     });
  //   });
  // }

  createPostagem(postagem: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/`, postagem).pipe(
      tap(() => {
        this.postagemCreated.emit(); // Emite o evento
      })
    );
  }

  deletePostagem(id: number): Observable<FormData> {
    return this.http.delete<FormData>(`${this.apiUrl}/${id}/`);
  }
}
