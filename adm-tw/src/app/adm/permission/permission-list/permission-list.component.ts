import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';

import { Column } from '../../../utils/model/column.model';
import { Severity } from '../../../shared/model/severity.model';
import { NotificationService } from '../../../shared/service/notification.service';
import { Permission } from '../permission.model';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrl: './permission-list.component.scss'
})
export class PermissionListComponent {

	@ViewChild('dt') dt: Table | undefined;
	dataList: Permission[] = [];
	cols: Column[] = [
		{ field: 'name', header: 'Nome' },
		{ field: 'codeName', header: 'Código' },
		{ field: 'isActive', header: 'Ativo' }
	];

	constructor(
		private service: PermissionService, 
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
		this.router.navigate([`/adm/permission/form/${id}`]);
	}

	enableOrDisable(id: string, reativar: boolean = false) {
		let msg = 'Deseja realmente inativar essa permissão?';
		let header = 'Confirmação de inativação';
		let successMsg = 'Permissão inativada.';

		if (reativar) {
			msg = 'Deseja realmente reativar essa permissão?';
			header = 'Confirmação de reativação';
			successMsg = 'Permissão reativada.';
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
}
