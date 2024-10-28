import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "./user.model";
import { BaseService } from "../../base/base.service";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(http: HttpClient) {
        super(http, 'users');
    }
}