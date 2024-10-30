import { User } from "../../adm/user/user.model";
import { Guild } from "../guild/guild.model";

export class UserGuild {
    id?: string;
    userId: string;
    guildId: string;
    createdAt?: Date;

    user?: User;
    guild?: Guild;

    constructor(obj: UserGuild) {
        this.id = obj.id;
        this.userId = obj.userId;
        this.guildId = obj.guildId;
        this.createdAt = obj.createdAt;
    }
}