import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

import { User } from '../../user/user.model';
import { Role } from '../../role/role.model';
import { AdmService } from '../../adm.service';
import { RoleService } from '../../role/role.service';
import { UserRole } from '../user-role.model';
import { UserService } from '../../user/user.service';

@Component({
	selector: 'app-user-permission-form',
	templateUrl: './user-permission-form.component.html',
	styleUrl: './user-permission-form.component.scss'
})
export class UserPermissionFormComponent implements OnInit {

	id!: string | null;
	userList: User[] = [];
	selectedUserId!: string;
	disableUserSelect = false;

	roleList: Role[] = [];
	userRoleList: Role[] = [];

	constructor(
		private service: AdmService,
		private userService: UserService,
		private roleService: RoleService,
		private notificationService: NotificationService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.userService.get().subscribe(result => {
			this.userList = result;
			this.getRoles();
		});
	}

	getRoles() {
		this.roleService.get().subscribe(result => {
			this.roleList = result;
			this.checkIdRoute();
		});
	}

	checkIdRoute() {
		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
			if (this.id) {
				this.getUserRoles(this.id);
				this.selectedUserId = this.id;
				this.disableUserSelect = true;
			}
		});
	}

	getUserRoles(id: string) {
		this.service.getUserRoles(id).subscribe({
			next: (result: UserRole[]) => {
				this.userRoleList = result
					.map(userRole => userRole.role)
					.filter((role): role is Role => !!role);

				this.roleList = this.roleList.filter(role => 
					!this.userRoleList.some(userRole => userRole.id === role.id)
				);
			},
			error: (error) => {
				this.notificationService.showToast(Severity.warning, 'Falha', 'Não foi possível carregar os papéis do usuário');
			}
		});
	}

	changeUser(userId: string) {
		this.getUserRoles(userId);
	}

	save() {
		if (this.id && this.userRoleList.length > 0) {
			const userRolesToSave: UserRole[] = this.userRoleList.map(role => ({
				userId: this.id!,
				roleId: role.id!,
			}));
	
			this.service.saveUserRoles(userRolesToSave).subscribe({
				next: () => {
					this.notificationService.showToast(Severity.success, 'Sucesso', 'Papéis atribuídos ao usuário com sucesso');
				},
				error: (error) => {
					this.notificationService.showToast(Severity.danger, 'Erro', 'Falha ao salvar os papéis do usuário');
				}
			});
		} else {
			this.notificationService.showToast(Severity.warning, 'Atenção', 'Nenhum papel selecionado para salvar');
		}
	}
	
}
