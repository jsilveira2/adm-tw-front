import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService, Message } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    messages: any = [];

    constructor(private primengConfig: PrimeNGConfig, private messageService: MessageService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.messageService.messageObserver.subscribe(messages => {
            this.messages = messages;
        });
    }
}
