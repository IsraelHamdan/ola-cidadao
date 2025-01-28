import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponsePostagens } from '../../interfaces/ResponsePostagens';
import { Postagens } from '../../interfaces/Postagens';

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
