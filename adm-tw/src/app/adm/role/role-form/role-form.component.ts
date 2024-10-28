import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../role.model';
import { RoleService } from '../role.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

@Component({
	selector: 'app-role-form',
	templateUrl: './role-form.component.html',
	styleUrl: './role-form.component.scss'
})
export class RoleFormComponent implements OnInit {

	form!: FormGroup;

	constructor(
		private service: RoleService, 
		private fb: FormBuilder, 
		private notificationService: NotificationService
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', Validators.required],
			codeName: ['', [Validators.required]]
		});
	}

	save(): void {
		if (this.form.valid) {
			const obj = new Role({
				name: this.form.get('name')?.value,
				codeName: this.form.get('codeName')?.value,
				isActive: true,
			});

			this.service.save(obj).subscribe(result => {
				if (result.id) {
					this.notificationService.showToast(Severity.success, 'Sucesso', 'Papel cadastrado com sucesso!');
					this.form.reset();
				}
			});
		} else {
			this.form.markAllAsTouched();
		}
	}
}
