import { Permission } from "../permission/permission.model";
import { User } from "../user/user.model";

export class UserPermission {
    id?: string;
    userId: string;
    permissionId: string;
    createdAt?: Date;

    user?: User;
    permission?: Permission;

    constructor(obj: UserPermission) {
        this.id = obj.id;
        this.userId = obj.userId;
        this.permissionId = obj.permissionId;
        this.createdAt = obj.createdAt;
    }
}