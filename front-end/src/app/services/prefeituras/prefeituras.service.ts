import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Prefeitura } from '../../interfaces/PrefeituraDTO';

@Injectable({
  providedIn: 'root',
})
export class PrefeiturasService {
  private baseUrl = environment.baseURL;
  private apiUrl = `${this.baseUrl}/prefeituras`;

  constructor(private http: HttpClient) {}

  getPrefeitura(id: number): Observable<Prefeitura> {
    return this.http.get<Prefeitura>(`${this.apiUrl}/${id}/`);
  }
}
