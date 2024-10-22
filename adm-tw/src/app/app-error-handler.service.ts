import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor() {}

    handleError(error: any): void {
        console.error('Erro capturado:', error);
        // this.ngZone.run(() => {
        //     this.messageService.add({
        //         severity: 'error',
        //         summary: 'Erro inesperado',
        //         detail: 'Ocorreu um erro durante a requisição. Tente novamente mais tarde.'
        //     });
        // });
        // TODO logService
    }
}
