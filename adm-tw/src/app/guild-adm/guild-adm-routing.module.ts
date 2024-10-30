import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GuildFormComponent } from './guild/guild-form/guild-form.component';
import { GuildListComponent } from './guild/guild-list/guild-list.component';
import { UserGuildFormComponent } from './user-guild/user-guild-form/user-guild-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'guild',
                children: [
                    { path: 'list', component: GuildListComponent },
                    { path: 'form', component: GuildFormComponent },
                    { path: 'form/:id', component: GuildFormComponent },
                ]
            },
            {
                path: 'user-guild',
                children: [
                    { path: 'form', component: UserGuildFormComponent },
                    { path: 'form/:id', component: UserGuildFormComponent },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class GuildAdmRoutingModule {
}