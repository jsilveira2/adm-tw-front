import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from '../../../shared/service/notification.service';
import { Severity } from '../../../shared/model/severity.model';

import { Guild } from '../guild.model';
import { GuildService } from '../guild.service';

@Component({
	selector: 'app-guild-form',
	templateUrl: './guild-form.component.html',
	styleUrl: './guild-form.component.scss'
})
export class GuildFormComponent {

	id!: string | null;
	form!: FormGroup;

	constructor(
		private service: GuildService, 
		private fb: FormBuilder, 
		private notificationService: NotificationService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			name: ['', Validators.required]
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
			next: (result: Guild) => {
				this.form.patchValue({
					name: result.name,
				});
			},
			error: (error) => {
				this.notificationService.showToast(Severity.warning, 'Falha', 'Não foi possível carregar a guild');
				this.router.navigate(['/guild-adm/guild/list']);
			}
		});
	}

	save(): void {
		if (this.form.valid) {
			const obj = new Guild({
				name: this.form.get('name')?.value,
				isActive: true
			});

			if (!this.id) {
				this.service.save(obj).subscribe(result => {
					if (result.id) {
						this.notificationService.showToast(Severity.success, 'Sucesso', 'Guild cadastrada com sucesso!');
						this.form.reset();
					}
				});
			} else {
				obj.id = this.id;
				this.service.update(obj.id, obj).subscribe(result => {
					if (result.id) {
						this.notificationService.showToast(Severity.success, 'Sucesso', 'Guild atualizada com sucesso!');
					}
				});
			}
		} else {
			this.form.markAllAsTouched();
		}
	}
}
