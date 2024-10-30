import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Guild } from "./guild.model";
import { BaseService } from "../../base/base.service";

@Injectable()
export class GuildService extends BaseService<Guild> {
    constructor(http: HttpClient) {
        super(http, 'guild');
    }
}