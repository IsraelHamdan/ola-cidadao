import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor iniciou');
    this.spinner.show();

    return next.handle(req).pipe(
      finalize(() => {
        console.log('Interceptor finalizou');
        this.spinner.hide();
      })
    );
  }
}
