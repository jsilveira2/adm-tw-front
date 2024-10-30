import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
	selector: 'app-users-form',
	templateUrl: './users-form.component.html',
	styleUrl: './users-form.component.scss'
})
export class UsersFormComponent implements OnInit {

	id!: string | null;
	form!: FormGroup;
	noMatchPassword!: boolean;

	constructor(
		private service: UserService, 
		private fb: FormBuilder, 
		private notificationService: NotificationService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordConfirm: ['', Validators.required]
		});

		this.route.paramMap.subscribe(params => {
			this.id = params.get('id');
			if (this.id) {
				this.loadObject(this.id);
			}
		});
	}

	loadObject(id: string) {
		this.service.getById(id).subscribe({
			next: (result: User) => {
				this.form.patchValue({
					name: result.name,
					email: result.email
				});
			},
			error: (error) => {
				this.notificationService.showToast(Severity.warning, 'Falha', 'Não foi possível carregar o usuário');
				this.router.navigate(['/adm/user/list']);
			}
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
			const obj = new User({
				name: this.form.get('name')?.value,
				email: this.form.get('email')?.value,
				password: this.form.get('password')?.value,
				isActive: true,
				isLocked: false
			});

			if (!this.id) {
				this.service.save(obj).subscribe(result => {
					if (result.id) {
						this.notificationService.showToast(Severity.success, 'Sucesso', 'Usuário cadastrado com sucesso!');
						this.form.reset();
					}
				});
			} else {
				obj.id = this.id;
				this.service.update(obj.id, obj).subscribe(result => {
					if (result.id) {
						this.notificationService.showToast(Severity.success, 'Sucesso', 'Usuário atualizado com sucesso!');
						this.form.reset();
					}
				});
			}
		} else {
			this.form.markAllAsTouched();
		}
	}
}
