import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

import { Permission } from '../permission.model';
import { PermissionService } from '../permission.service';
import { Role } from '../../role/role.model';
import { RoleService } from '../../role/role.service';

@Component({
	selector: 'app-permission-form',
	templateUrl: './permission-form.component.html',
	styleUrl: './permission-form.component.scss'
})
export class PermissionFormComponent implements OnInit {

	form!: FormGroup;
	id!: string | null;
	roleList!: Role[];

	constructor(
		private service: PermissionService,
		private roleService: RoleService,
		private fb: FormBuilder,
		private notificationService: NotificationService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', Validators.required],
			codeName: ['', [Validators.required]],
			roleId: ['', [Validators.required]]
		});

		this.getRoles();
	}

	getRoles() {
		this.roleService.get().subscribe(data => {
			this.roleList = data;
			this.route.paramMap.subscribe(params => {
				this.id = params.get('id');
				if (this.id) {
					this.loadObject(this.id);
				}
			});
		});
	}

	loadObject(id: string) {
		this.service.getById(id).subscribe({
			next: (result: Permission) => {
				this.form.patchValue({
					name: result.name,
					codeName: result.codeName,
					roleId: result.roleId
				});
			},
			error: (error) => {
				this.notificationService.showToast(Severity.warning, 'Falha', 'Não foi possível carregar a permissão');
				this.router.navigate(['/adm/permission/list']);
			}
		});
	}

	save(): void {
		if (this.form.valid) {
			const obj = new Permission({
				name: this.form.get('name')?.value,
				codeName: this.form.get('codeName')?.value,
				roleId: this.form.get('roleId')?.value,
				isActive: true,
			});

			if (!this.id) {
				this.service.save(obj).subscribe(result => {
					if (result.id) {
						this.notificationService.showToast(Severity.success, 'Sucesso', 'Permissão cadastrada com sucesso!');
						this.form.reset();
					}
				});
			} else {
				obj.id = this.id;
				this.service.update(obj.id, obj).subscribe(result => {
					if (result.id) {
						this.notificationService.showToast(Severity.success, 'Sucesso', 'Permissão atualizada com sucesso!');
					}
				});
			}
		} else {
			this.form.markAllAsTouched();
		}
	}
}
