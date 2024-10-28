import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Permission } from "./permission.model";
import { BaseService } from '../../base/base.service';

@Injectable()
export class PermissionService extends BaseService<Permission> {
    constructor(http: HttpClient) {
        super(http, 'permissions');
    }
}
