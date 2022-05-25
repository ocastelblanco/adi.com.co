import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let mensajeError: string = '';
          if (error.error instanceof ErrorEvent) {
            // El error es client-side
            mensajeError = `Error: ${error.error.message}`;
          } else {
            // El error es server-side
            mensajeError = `Error Code: ${error.status},  Mensaje: ${error.message}`;
          }
          return throwError(() => mensajeError);
        })
      );
  }
}
