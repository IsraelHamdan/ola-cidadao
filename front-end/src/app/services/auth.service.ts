import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://olacidadao-3391b9c80935.herokuapp.com/api';
  private tokenEndpoint = '/token/';
  private cidadaoEndpoint = '/cidadaos/';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ access: string; refresh: string }>( // Modificar para refletir a estrutura correta da resposta
        `${this.baseUrl}${this.tokenEndpoint}`,
        credentials
      )
      .pipe(
        tap((response) => {
          console.log('Resposta do login:', response); // Log completo da resposta
          if (response?.access) {
            // Verificar se existe a chave 'access' com o token
            console.log('Token de acesso obtido na resposta:', response.access); // Verificar o token
            localStorage.setItem('token', response.access); // Salvar o token de acesso no localStorage
            this.fetchUserDetails(); // Chamar para buscar os dados do usuário
          } else {
            console.error('Token de acesso não encontrado na resposta.');
          }
        })
      );
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token recuperado do localStorage:', token); // Log para verificar se o token foi recuperado
    return token;
  }

  decodeToken(token: string): any {
    if (!token || token.split('.').length !== 3) {
      console.error('Token inválido ou malformado.');
      return null;
    }
    try {
      const payload = token.split('.')[1]; // Extrai a segunda parte (payload)
      console.log('Payload do token:', payload);
      const decodedPayload = atob(payload); // Decodifica da base64
      console.log('Payload decodificado:', decodedPayload);
      return JSON.parse(decodedPayload); // Converte de JSON para objeto
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  fetchUserDetails(): void {
    const token = this.getToken();
    console.log('Token obtido dentro de fetchUserDetails:', token); // Verificar o token obtido

    if (token) {
      const decoded = this.decodeToken(token);
      console.log('Token decodificado:', decoded);
      const userId = decoded?.user_id;
      console.log('ID do usuário:', userId);

      if (userId) {
        this.http
          .get(`${this.baseUrl}${this.cidadaoEndpoint}${userId}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .subscribe({
            next: (user) => {
              console.log('Dados do usuário:', user);
              localStorage.setItem('user', JSON.stringify(user));
            },
            error: (error) => {
              console.error('Erro ao buscar dados do usuário:', error);
            },
          });
      } else {
        console.warn('ID do usuário não encontrado no token.');
      }
    } else {
      console.warn('Token não encontrado.');
    }
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
