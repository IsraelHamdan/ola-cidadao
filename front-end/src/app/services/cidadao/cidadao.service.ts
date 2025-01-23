import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CidadaoService {
  private baseUrl = environment.baseURL;
  private apiUrl = `${this.baseUrl}`;

  userUpdated = new EventEmitter<void>();

  private urlRequest = `${environment.baseURL}/cidadaos/cadastro/`;
  constructor(private http: HttpClient) {}

  createCidadao(cidadao: FormData): Observable<any> {
    return this.http.post<any>(this.urlRequest, cidadao); // Note que o tipo do parâmetro foi ajustado para FormData
  }

  getCidadao(id: number): Observable<CidadaoDTO> {
    return this.http.get<CidadaoDTO>(`${this.urlRequest}/${id}/`);
  }

  getAllCidadaos(): Observable<CidadaoDTO[]> {
    return this.http.get<CidadaoDTO[]>(`${this.urlRequest}`);
  }

  updateCidadao(
    id: number,
    cidadao: Partial<FormData>
  ): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/cidadaos/${id}/`,
      cidadao
    );
  }

  deleteCidadao(id: number) {
    return this.http.delete(`${this.urlRequest}/${id}`);
  }
}
