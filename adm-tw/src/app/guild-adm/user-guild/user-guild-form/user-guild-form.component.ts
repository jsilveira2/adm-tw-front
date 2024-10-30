import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

import { Guild } from '../../guild/guild.model';
import { GuildService } from '../../guild/guild.service';
import { User } from '../../../adm/user/user.model';
import { UserService } from '../../../adm/user/user.service';
import { UserGuild } from '../user-guild.model';
import { UserGuildService } from '../user-guild.service';

@Component({
	selector: 'app-user-guild-form',
	templateUrl: './user-guild-form.component.html',
	styleUrl: './user-guild-form.component.scss'
})
export class UserGuildFormComponent implements OnInit {

	id!: string | null;
	guildList: Guild[] = [];
	selectedGuildId!: string;
	disableGuildSelect = false;

	userList: User[] = [];
	userGuildList: User[] = [];

	constructor(
		private service: UserGuildService,
		private guildService: GuildService,
		private userService: UserService,
		private notificationService: NotificationService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.getGuilds();
	}

	getGuilds() {
		this.guildService.get().subscribe(result => {
			this.guildList = result;
			this.checkIdRoute();
			this.getUsers();
		});
	}

	getUsers() {
		this.userService.get().subscribe(result => {
			this.userList = result;
		});
	}

	checkIdRoute() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
			if (this.id) {
				this.selectedGuildId = this.id;
				this.disableGuildSelect = true;
				this.getGuildUsers(this.id);
			}
		});
	}

	getGuildUsers(id: string) {
		this.service.getGuildUsers(id).subscribe({
			next: (result: UserGuild[]) => {
				this.userGuildList = result
					.map(userGuild => userGuild.user)
					.filter((user): user is User => !!user);

				this.userList = this.userList.filter(user => 
					!this.userGuildList.some(userGuild => userGuild.id === user.id)
				);
			},
			error: (error) => {
				this.notificationService.showToast(Severity.warning, 'Falha', 'Não foi possível carregar os usuários da guild');
			}
		});
	}

	changeGuild(guildId: string) {
		this.getGuildUsers(guildId);
	}

	save() {
		if (this.id && this.userGuildList.length > 0) {
			const guildUsersToSave: UserGuild[] = this.userGuildList.map(user => ({
				guildId: this.id!,
				userId: user.id!,
			}));
	
			this.service.saveGuildUsers(guildUsersToSave).subscribe({
				next: () => {
					this.notificationService.showToast(Severity.success, 'Sucesso', 'Usuários atribuídos a guild com sucesso');
				},
				error: (error) => {
					console.log(error)
					this.notificationService.showToast(Severity.danger, 'Erro', 'Falha ao salvar os usuários da guild');
				}
			});
		} else {
			this.notificationService.showToast(Severity.warning, 'Atenção', 'Nenhuma guild selecionada para salvar');
		}
	}
}
