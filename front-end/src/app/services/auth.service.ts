import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://olacidadao-3391b9c80935.herokuapp.com/api';
  private tokenEndpoint = '/token/';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}${this.tokenEndpoint}`,
      credentials
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    // Remova o token do localStorage ou sessionStorage
    localStorage.removeItem('token');

    // Opcional: Limpe outros dados do usuário
    localStorage.removeItem('user');

    // Redirecione para a página de login
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Verifica se o token está presente
    return !!localStorage.getItem('token');
  }
}
