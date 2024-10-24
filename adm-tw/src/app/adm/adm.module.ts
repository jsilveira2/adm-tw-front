import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

import { AdmRoutingModule } from './adm-routing.module';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UsersFormComponent } from './user/users-form/users-form.component';
import { AdmService } from './adm.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [
        UsersListComponent,
        UsersFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdmRoutingModule,
        TableModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        TagModule,
        MessageModule,
        PasswordModule
    ],
    providers: [
        AdmService
    ]
})
export class AdmModule {}