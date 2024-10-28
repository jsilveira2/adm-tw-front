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
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

import { AdmRoutingModule } from './adm-routing.module';
import { AdmService } from './adm.service';
import { UserService } from './user/user.service';
import { RoleService } from './role/role.service';
import { PermissionService } from './permission/permission.service';

import { UsersListComponent } from './user/users-list/users-list.component';
import { UsersFormComponent } from './user/users-form/users-form.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionFormComponent } from './permission/permission-form/permission-form.component';

@NgModule({
    declarations: [
        UsersListComponent,
        UsersFormComponent,
        RoleListComponent,
        RoleFormComponent,
        PermissionListComponent,
        PermissionFormComponent,
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
        PasswordModule,
        TooltipModule,
        ConfirmDialogModule,
        DropdownModule
    ],
    providers: [
        AdmService,
        UserService,
        RoleService,
        PermissionService,
        ConfirmationService
    ]
})
export class AdmModule {}