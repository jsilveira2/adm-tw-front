import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';

import { GuildService } from './guild/guild.service';
import { UserGuildService } from './user-guild/user-guild.service';
import { UserService } from '../adm/user/user.service';

import { GuildAdmRoutingModule } from './guild-adm-routing.module';
import { GuildListComponent } from './guild/guild-list/guild-list.component';
import { GuildFormComponent } from './guild/guild-form/guild-form.component';
import { UserGuildFormComponent } from './user-guild/user-guild-form/user-guild-form.component';

@NgModule({
    declarations: [
        GuildListComponent,
        GuildFormComponent,
        UserGuildFormComponent
    ],
    imports: [
        GuildAdmRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        TagModule,
        MessageModule,
        TooltipModule,
        ConfirmDialogModule,
        DropdownModule,
        PickListModule
    ],
    providers: [
        GuildService,
        UserGuildService,
        UserService,
        ConfirmationService
    ]
})
export class GuildAdmModule { }