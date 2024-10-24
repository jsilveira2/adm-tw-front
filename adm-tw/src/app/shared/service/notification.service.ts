import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {

    constructor(private messageService: MessageService) { }

    addMessage(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity, summary, detail, key: 'global' });
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({ severity, summary, detail, life: 3000 });
    }

    clear() {
        this.messageService.clear();
    }
}
