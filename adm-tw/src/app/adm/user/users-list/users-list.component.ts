import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Column } from '../../../utils/model/column.model';
import { User } from '../user.model';
import { AdmService } from '../../adm.service';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

	@ViewChild('dt') dt: Table | undefined;
	userList: User[] = [];
	cols: Column[] = [
		{ field: 'name', header: 'Nome' },
		{ field: 'email', header: 'Email' },
		{ field: 'isActive', header: 'Ativo' },
		{ field: 'lastLogin', header: 'Dt. Último login' },
		{ field: 'isLocked', header: 'Bloqueado' }
	];

	constructor(private service: AdmService) { }

	ngOnInit(): void {
		this.service.getUsers().subscribe(result => {
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
}
