import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { NotificationService } from './shared/service/notification.service';
import { Severity } from './shared/model/severity.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private notificationService: NotificationService) {}

    handleError(error: any): void {
        console.error('Erro capturado:', error);
        if (!error.missingToken) {
            this.notificationService.showToast(Severity.danger, 'Erro', 'Houve um erro inesperado, tente novamente mais tarde!');
        }

        // TODO logService
    }
}
