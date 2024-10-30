import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { Column } from '../../../utils/model/column.model';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

	@ViewChild('dt') dt: Table | undefined;
	cols: Column[] = [
		{ field: 'name', header: 'Nome' },
		{ field: 'email', header: 'Email' },
		{ field: 'isActive', header: 'Ativo' },
		{ field: 'lastLogin', header: 'Dt. Último login' },
		{ field: 'isLocked', header: 'Bloqueado' }
	];
	
	userList: User[] = [];

	constructor(
		private service: UserService, 
		private router: Router,
		private confirmationService: ConfirmationService,
		private notifyService: NotificationService
	) { }

	ngOnInit(): void {
		this.getData();
	}

	getData() {
		this.service.get().subscribe(result => {
			this.userList = result;
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
		this.router.navigate([`/adm/user/form/${id}`]);
	}

	enableOrDisable(id: string, reativar: boolean = false) {
		let msg = 'Deseja realmente inativar esse usuário?';
		let header = 'Confirmação de inativação';
		let successMsg = 'Usuário inativado.';

		if (reativar) {
			msg = 'Deseja realmente reativar esse usuário?';
			header = 'Confirmação de reativação';
			successMsg = 'Usuário reativado.';
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

	permissions(id: string) {
		this.router.navigate([`/adm/user/permission/${id}`]);
	}
}
