import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';
import { AdmService } from '../../adm.service';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

@Component({
	selector: 'app-users-form',
	templateUrl: './users-form.component.html',
	styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {

	form!: FormGroup;
	noMatchPassword!: boolean;

	constructor(private service: AdmService, private fb: FormBuilder, private notificationService: NotificationService) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordConfirm: ['', Validators.required]
		});
	}

	save(): void {
		if (this.form.valid) {
			if (this.form.get('password')?.value !== this.form.get('passwordConfirm')?.value) {
				this.form.get('password')?.setErrors({ mismatch: true });
				this.form.get('passwordConfirm')?.setErrors({ mismatch: true });
				this.form.get('password')?.markAsTouched();
				this.form.get('passwordConfirm')?.markAsTouched();
				this.noMatchPassword = true;
				return;
			}

			this.noMatchPassword = false;
			const user = new User({
				name: this.form.get('name')?.value,
				email: this.form.get('email')?.value,
				password: this.form.get('password')?.value,
				isActive: true,
				isLocked: false
			});

			this.service.saveUser(user).subscribe(result => {
				if (result.id) {
					this.notificationService.showToast(Severity.success, 'Sucesso', 'Usuário cadastrado com sucesso!');
				}
			});
		} else {
			this.form.markAllAsTouched();
		}
	}
}
