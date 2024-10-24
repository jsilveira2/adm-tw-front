import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../login-response.model';

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

    constructor(private service: AuthService, private router: Router) { }

    login() {
        this.service.login(this.email, this.password).subscribe({
            next: (result: LoginResponse) => {
                this.router.navigate(['/']);
            },
            error: (error) => {
                console.error('Erro no login:', error);
            }
        });
    }
}
