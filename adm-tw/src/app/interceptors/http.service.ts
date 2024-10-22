import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppErrorHandler } from '../app-error-handler.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();

        if (!req.url.includes('/login') && !req.url.includes('/logout') && token) {
            const modifiedReq = req.clone({
                withCredentials: true,
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            return next.handle(modifiedReq).pipe(
                catchError((error: HttpErrorResponse) => {
                    // this.errorHandler.handleError(error);
                    return throwError(() => new Error(error.message));
                })
            );
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // this.errorHandler.handleError(error);
                return throwError(() => new Error(error.message));
            })
        );
    }
}
