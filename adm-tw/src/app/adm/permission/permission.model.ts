import { Role } from "../role/role.model";

export class Permission {
    id?: string;
    name: string;
    codeName: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    roleId: string;
    role?: Role;

    constructor(obj: Permission) {
        this.id = obj.id;
        this.name = obj.name;
        this.codeName = obj.codeName;
        this.isActive = obj.isActive;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
        this.roleId = obj.roleId;
    }
}