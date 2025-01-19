import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginCredentials } from '../../../interfaces/loginCredentials';
import { LoginResponse } from '../../../interfaces/LoginResponse';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseURL;
  private tokenEndpoint = 'token/';
  private cidadaoEndpoint = '/cidadaos/';

  constructor(private http: HttpClient, private router: Router) {}

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(credentials: LoginCredentials): Observable<any> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/${this.tokenEndpoint}`, credentials)
      .pipe(
        tap((response) => {
          if (response?.access) {
            localStorage.setItem('token', response.access);
            this.fetchUserDetails();
            this.isLoggedInSubject.next(true); // Atualiza o estado de login
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false); // Atualiza o estado de login
    this.router.navigate(['/dashboard']);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    // console.log('Token recuperado do localStorage:', token); // Log para verificar se o token foi recuperado
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

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
