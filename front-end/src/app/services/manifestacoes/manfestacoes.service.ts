import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manifestacao } from '../../../interfaces/Manifestacao';
import { environment } from '../../../environments/environment';
import { ResponseManifestacao } from '../../../interfaces/ResponseManifestacao';

@Injectable({
  providedIn: 'root',
})
export class ManfestacoesService {
  private baseApiUrl = environment.baseURL;
  private apiUrl = `${this.baseApiUrl}/manifestacoes`;
  allManifestations!: Manifestacao[];

  constructor(private http: HttpClient) {}

  getAllManifestations(): Observable<ResponseManifestacao<Manifestacao[]>> {
    return this.http.get<ResponseManifestacao<Manifestacao[]>>(
      `${this.apiUrl}/respostas/`
    );
  }

  getPaginatedManifestations(
    url: string
  ): Observable<ResponseManifestacao<Manifestacao[]>> {
    return this.http.get<ResponseManifestacao<Manifestacao[]>>(url);
  }

  createManifestation(manifestacao: FormData): Observable<any> {
    return this.http.post<FormData>(`${this.apiUrl}/`, manifestacao);
  }
}
