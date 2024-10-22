import { ErrorHandler, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

import { AppLayoutModule } from './layout/app.layout.module';
import { HttpRequestInterceptor } from './interceptors/http.service';
import { AppErrorHandler } from './app-error-handler.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthService } from './auth/auth.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        AppRoutingModule, 
        AppLayoutModule,
        MessagesModule
    ],
    providers: [
        MessageService,
        AuthService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: AppErrorHandler },
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
