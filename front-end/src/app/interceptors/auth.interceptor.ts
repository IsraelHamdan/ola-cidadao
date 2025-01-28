import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/token/auth.service';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const expirationTime = authService.getTokenExpiration();
    const currentTime = new Date().getTime();

    if (expirationTime && expirationTime <= currentTime) {
      authService.logout(); // Desloga se o token estiver expirado
      return next(req); // Retorna a requisição mesmo assim
    }
  }

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq);
};
