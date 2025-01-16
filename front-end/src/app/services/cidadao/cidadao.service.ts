import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CidadaoDTO } from '../../../interfaces/CidadaoDTO';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CidadaoService {
  private urlRequest = `${environment.baseURL}/cidadaos/`;
  constructor(private req: HttpClient) {}

  createCidadao(cidadao: CidadaoDTO): Observable<CidadaoDTO> {
    return this.req.post<CidadaoDTO>(`${this.urlRequest}`, cidadao);
  }

  getCidadao(id: number): Observable<CidadaoDTO> {
    return this.req.get<CidadaoDTO>(`${this.urlRequest}/${id}/`);
  }

  getAllCidadaos(): Observable<CidadaoDTO[]> {
    return this.req.get<CidadaoDTO[]>(`${this.urlRequest}`);
  }

  updateCidadao(
    id: number,
    cidadao: Partial<CidadaoDTO>
  ): Observable<CidadaoDTO> {
    return this.req.patch<CidadaoDTO>(`${this.urlRequest}/${id}`, cidadao);
  }

  deleteCidadao(id: number) {
    return this.req.delete(`${this.urlRequest}/${id}`);
  }
}
