import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UserGuild } from "./user-guild.model";
import { BaseService } from "../../base/base.service";
import { Observable } from "rxjs";

@Injectable()
export class UserGuildService extends BaseService<UserGuild> {
    constructor(http: HttpClient) {
        super(http, 'user-guild');
    }

    getGuildUsers(guildId: string): Observable<UserGuild[]> {
        return this.http.get<UserGuild[]>(`${this.apiUrl}/user-guild/guildId/${guildId}`);
    }

    saveGuildUsers(userRoles: UserGuild[]): Observable<UserGuild[]> {
        return this.http.post<UserGuild[]>(`${this.apiUrl}/user-guild/createMany`, userRoles);
    }
}