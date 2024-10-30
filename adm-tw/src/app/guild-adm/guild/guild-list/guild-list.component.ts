import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { Column } from '../../../utils/model/column.model';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';
import { Guild } from '../guild.model';
import { GuildService } from '../guild.service';

@Component({
	selector: 'app-guild-list',
	templateUrl: './guild-list.component.html',
	styleUrl: './guild-list.component.scss'
})
export class GuildListComponent implements OnInit {

	@ViewChild('dt') dt: Table | undefined;
	cols: Column[] = [
		{ field: 'name', header: 'Nome' },
		{ field: 'isActive', header: 'Ativo' }
	];

	dataList: Guild[] = [];

	constructor(
		private service: GuildService, 
		private router: Router,
		private confirmationService: ConfirmationService,
		private notifyService: NotificationService
	) { }

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.service.get().subscribe(result => {
			this.dataList = result;
		});
	}

	applyFilterGlobal($event: any, stringVal: any) {
		this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
	}

	getSeverity(value: boolean) {
		if (value) {
			return 'success';
		}

		return 'danger';
	}

	edit(id: string) {
		this.router.navigate([`/guild-adm/guild/form/${id}`]);
	}

	enableOrDisable(id: string, reativar: boolean = false) {
		let msg = 'Deseja realmente inativar essa guild?';
		let header = 'Confirmação de inativação';
		let successMsg = 'Guild inativada.';

		if (reativar) {
			msg = 'Deseja realmente reativar essa guild?';
			header = 'Confirmação de reativação';
			successMsg = 'Guild reativada.';
		}

		this.confirmationService.confirm({
            message: msg,
            header: header,
            acceptButtonStyleClass:"p-button-danger",
			acceptLabel: 'Sim',
			rejectLabel: 'Não',
            accept: () => {
				this.changeStatus(id, reativar, successMsg);
            },
        });
	}

	changeStatus(id: string, status: boolean, msg: string) {
		this.service.getById(id).subscribe(data => {
			const obj = data;
			obj.isActive = status;
			delete obj.createdAt;
			delete obj.updatedAt;
			this.service.update(id, obj).subscribe(result => {
				this.notifyService.showToast(Severity.success, 'Sucesso', msg);
				this.getData();
			});
		});
	}

	usersFromGuild(guildId: string) {
		this.router.navigate([`/guild-adm/user-guild/form/${guildId}`]);
	}
}
