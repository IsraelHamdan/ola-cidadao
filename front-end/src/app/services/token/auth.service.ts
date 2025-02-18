import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginCredentials } from '../../interfaces/loginCredentials';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { environment } from '../../../environments/environment.development';
import { CidadaoDTO } from '../../interfaces/CidadaoDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseURL;
  private tokenEndpoint = 'token/';
  private cidadaoEndpoint = '/cidadaos/';

  public currentUser = new BehaviorSubject<CidadaoDTO | null>(null);
  currentUser$ = this.currentUser.asObservable();

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
            this.startTokenExpirationTimer();
          }
        })
      );
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
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload; // Retorna o payload decodificado
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded?.exp ? decoded.exp * 1000 : null; // Retorna o timestamp de expiração em milissegundos
    }
    return null;
  }

  startTokenExpirationTimer(): void {
    const expirationTime = this.getTokenExpiration();
    if (expirationTime) {
      const currentTime = new Date().getTime();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration > 0) {
        setTimeout(() => {
          this.logout(); // Desloga o usuário quando o token expira
        }, timeUntilExpiration);
      }
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
          .get<CidadaoDTO>(`${this.baseUrl}${this.cidadaoEndpoint}${userId}/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .subscribe({
            next: (user) => {
              console.log('Dados do usuário:', user);
              localStorage.setItem('user', JSON.stringify(user));
              this.currentUser.next(user);
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

  getUser(): Observable<CidadaoDTO | null> {
    const user = localStorage.getItem('user');

    console.log('ATUALIZOU');

    if (user) {
      const userSave: CidadaoDTO = JSON.parse(user);
      this.currentUser.next(userSave);
    }

    return this.currentUser.asObservable();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);

    this.currentUser.next(null);

    this.router.navigate(['/dashboard']); // Redireciona após logout
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
