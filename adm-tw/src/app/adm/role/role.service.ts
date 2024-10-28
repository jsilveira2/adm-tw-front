import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Role } from "./role.model";
import { BaseService } from "../../base/base.service";

@Injectable()
export class RoleService extends BaseService<Role> {
    constructor(http: HttpClient) {
        super(http, 'roles');
    }
}