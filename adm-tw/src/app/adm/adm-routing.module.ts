import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UsersFormComponent } from './user/users-form/users-form.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'list', component: UsersListComponent },
            { path: 'form', component: UsersFormComponent },
            { path: 'form/:id', component: UsersFormComponent },
        ])
    ],
    exports: [RouterModule]
})
export class AdmRoutingModule {
}