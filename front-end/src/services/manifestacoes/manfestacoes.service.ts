import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manifestacao } from '../../interfaces/Manifestacao';
import { enviroments } from '../../enviroments';
import { ResponseManifestacao } from '../../interfaces/ResponseManifestacao';

@Injectable({
  providedIn: 'root',
})
export class ManfestacoesService {
  private baseApiUrl = enviroments.baseURL;
  private apiUrl = `${this.baseApiUrl}/manifestacoes/`;
  allManifestations!: Manifestacao[];

  constructor(private http: HttpClient) {}

  getAllManifestations(): Observable<ResponseManifestacao<Manifestacao[]>> {
    return this.http.get<ResponseManifestacao<Manifestacao[]>>(this.apiUrl);
  }
}
