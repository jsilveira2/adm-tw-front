import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    email!: string;
    password!: string;
    rememberme!: boolean;

    constructor(private service: AuthService) { }

    login() {
        this.service.login(this.email, this.password).subscribe(result => {
            console.log(result);
        });
    }
}
