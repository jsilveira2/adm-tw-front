import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { UserRole } from "./user-permission/user-role.model";

@Injectable()
export class AdmService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getUserRoles(userId: string): Observable<UserRole[]> {
        return this.http.get<UserRole[]>(`${this.apiUrl}/user-roles/byUserId/${userId}`);
    }

    saveUserRoles(userRoles: UserRole[]): Observable<UserRole[]> {
        return this.http.post<UserRole[]>(`${this.apiUrl}/user-roles/createMany`, userRoles);
    }
}