
import { Role } from "../role/role.model";
import { User } from "../user/user.model";

export class UserRole {
    id?: string;
    userId: string;
    roleId: string;
    createdAt?: Date;

    user?: User;
    role?: Role;

    constructor(obj: UserRole) {
        this.id = obj.id;
        this.userId = obj.userId;
        this.roleId = obj.roleId;
        this.createdAt = obj.createdAt;
    }
}