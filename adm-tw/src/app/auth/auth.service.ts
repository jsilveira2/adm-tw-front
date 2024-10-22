import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from "../../environments/environment";
import { LoginResponse } from "./login-response.model";

@Injectable()
export class AuthService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<LoginResponse> {
        const body = { email, password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const route = `${this.apiUrl}/login`;
        console.log(route)
        return this.http.post<LoginResponse>(route, body, { headers, withCredentials: true }).pipe(tap((response: LoginResponse) => {
            this.storeAccessToken(response.access_token);
        }));
    }

    logout(): Observable<any> {
        return this.http.get(`${this.apiUrl}/logout`, { withCredentials: true });
    }

    private storeAccessToken(token: string): void {
        sessionStorage.setItem('access_token', token);
    }

    private removeAccessToken(): void {
        sessionStorage.removeItem('access_token');
    }

    getAccessToken(): string | null {
        return sessionStorage.getItem('access_token');
    }
}