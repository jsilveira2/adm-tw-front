import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { AdmRoutingModule } from './adm-routing.module';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UsersFormComponent } from './user/users-form/users-form.component';
import { AdmService } from './adm.service';

@NgModule({
    declarations: [
        UsersListComponent,
        UsersFormComponent
    ],
    imports: [
        CommonModule,
        AdmRoutingModule,
        TableModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        TagModule
    ],
    providers: [AdmService]
})
export class AdmModule {}