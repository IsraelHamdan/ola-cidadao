import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Manifestacao } from '../../interfaces/Manifestacao';
import { environment } from '../../../environments/environment';
import { ResponseManifestacao } from '../../interfaces/ResponseManifestacao';

@Injectable({
  providedIn: 'root',
})
export class ManfestacoesService {
  private baseApiUrl = environment.baseURL;
  private apiUrl = `${this.baseApiUrl}/manifestacoes`;

  // Emissor de eventos para notificações de novas manifestações
  manifestationCreated = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  // Obtém todas as manifestações
  getAllManifestations(): Observable<ResponseManifestacao<Manifestacao[]>> {
    return this.http.get<ResponseManifestacao<Manifestacao[]>>(
      `${this.apiUrl}/respostas/`
    );
  }

  // Obtém manifestações paginadas
  getPaginatedManifestations(
    url: string
  ): Observable<ResponseManifestacao<Manifestacao[]>> {
    return this.http.get<ResponseManifestacao<Manifestacao[]>>(url);
  }

  createManifestation(manifestacao: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/`, manifestacao).pipe(
      tap(() => {
        this.manifestationCreated.emit(); // Emite o evento
      })
    );
  }

  deleteManifestation(id: number): Observable<FormData> {
    return this.http.delete<FormData>(`${this.apiUrl}/${id}/`);
  }

  editManifestation(id: number, manifestacao: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/`, manifestacao);
  }

  getInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/info/`);
  }

  getUserManifestations(): Observable<{
    results: Manifestacao[];
    next: string | null;
  }> {
    return this.http.get<{ results: Manifestacao[]; next: string | null }>(
      `${this.apiUrl}/usuario/`
    );
  }
}
