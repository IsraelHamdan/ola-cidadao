import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Secretaria } from '../../../interfaces/SecretariaDTO';
import { ResponseSecretaria } from '../../../interfaces/ResponseSecretaria';

@Injectable({
  providedIn: 'root',
})
export class SecretariasService {
  baseUrl = environment.baseURL;
  apiUrl = `${this.baseUrl}/orgaos`;

  constructor(private http: HttpClient) {}

  getAllSecretarias(): Observable<ResponseSecretaria<Secretaria[]>> {
    return this.http.get<ResponseSecretaria<Secretaria[]>>(`${this.apiUrl}/`);
  }

  getSecretaria(id: number): Observable<ResponseSecretaria<Secretaria>> {
    return this.http.get<ResponseSecretaria<Secretaria>>(
      `${this.apiUrl}/${id}`
    );
  }
}
