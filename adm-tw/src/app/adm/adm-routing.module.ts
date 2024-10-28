import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UsersFormComponent } from './user/users-form/users-form.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionFormComponent } from './permission/permission-form/permission-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user',
                children: [
                    { path: 'list', component: UsersListComponent },
                    { path: 'form', component: UsersFormComponent },
                    { path: 'form/:id', component: UsersFormComponent },
                ]
            },
            {
                path: 'role',
                children: [
                    { path: 'list', component: RoleListComponent },
                    { path: 'form', component: RoleFormComponent },
                    { path: 'form/:id', component: RoleFormComponent },
                ]
            },
            {
                path: 'permission',
                children: [
                    { path: 'list', component: PermissionListComponent },
                    { path: 'form', component: PermissionFormComponent },
                    { path: 'form/:id', component: PermissionFormComponent },
                    { path: 'form/:id/:roleId', component: PermissionFormComponent },
                ]
            },
        ])
    ],
    exports: [RouterModule]
})
export class AdmRoutingModule {
}