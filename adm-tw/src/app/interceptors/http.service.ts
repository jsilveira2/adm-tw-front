import { Injectable, forwardRef, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandler } from '../app-error-handler.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/service/notification.service';
import { Severity } from '../shared/model/severity.model';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();

        if (!req.url.includes('/login') && !req.url.includes('/logout')) {
            if (token) {
                const modifiedReq = req.clone({
                    withCredentials: true,
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                return next.handle(modifiedReq).pipe(
                    catchError((error: HttpErrorResponse) => {
                        return throwError(() => new Error(error.message));
                    })
                );
            } else {
                this.notificationService.showToast(Severity.info, 'Atenção', 'Sessão expirada. Por favor, faça login novamente.')
                this.router.navigate(['/auth/login']);
                return throwError(() => {
                    const error: any = new Error('Token ausente. Redirecionando para a página de login.');
                    error.missingToken = true;
                    return error;
                });
            }
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                return throwError(() => new Error(error.message));
            })
        );
    }
}
