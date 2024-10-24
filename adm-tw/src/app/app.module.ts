import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { HttpRequestInterceptor } from './interceptors/http.service';
import { GlobalErrorHandler } from './app-error-handler.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthService } from './auth/auth.service';
import { NotificationService } from './shared/service/notification.service';
import { AppMenuitemComponent } from './layout/app.menuitem.component';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { AppFooterComponent } from './layout/app.footer.component';
import { AppMenuComponent } from './layout/app.menu.component';
import { AppSidebarComponent } from './layout/app.sidebar.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppConfigModule } from './layout/config/config.module';
import { LayoutService } from './layout/service/app.layout.service';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MessagesModule,
        ToastModule,
        AppConfigModule,
    ],
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        AuthService,
        LayoutService,
        NotificationService,
        MessageService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
