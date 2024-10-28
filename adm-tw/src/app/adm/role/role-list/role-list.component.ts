import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { Column } from '../../../utils/model/column.model';
import { Role } from '../role.model';
import { RoleService } from '../role.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

@Component({
	selector: 'app-role-list',
	templateUrl: './role-list.component.html',
	styleUrl: './role-list.component.scss'
})
export class RoleListComponent implements OnInit {

	@ViewChild('dt') dt: Table | undefined;
	dataList: Role[] = [];
	cols: Column[] = [
		{ field: 'name', header: 'Nome' },
		{ field: 'codeName', header: 'Código' },
		{ field: 'isActive', header: 'Ativo' }
	];

	constructor(
		private service: RoleService, 
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
		this.router.navigate([`/adm/role/form/${id}`]);
	}

	disable(id: string) {
		this.confirmationService.confirm({
            message: 'Deseja realmente inativar esse papel?',
            header: 'Confirmação de inativação',
            acceptButtonStyleClass:"p-button-danger",
			acceptLabel: 'Sim',
			rejectLabel: 'Não',
            accept: () => {
				this.changeStatus(id, false, 'Papel inativado.');
            },
        });
	}

	enable(id: string) {
		this.confirmationService.confirm({
            message: 'Deseja realmente reativar esse papel?',
            header: 'Confirmação de reativação',
            acceptButtonStyleClass:"p-button-danger",
			acceptLabel: 'Sim',
			rejectLabel: 'Não',
            accept: () => {
				this.changeStatus(id, true, 'Papel reativado.');
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
}
