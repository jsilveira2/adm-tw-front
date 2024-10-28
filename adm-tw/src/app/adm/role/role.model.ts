export class Role {
    id?: string;
    name: string;
    codeName: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(obj: Role) {
        this.id = obj.id;
        this.name = obj.name;
        this.codeName = obj.codeName;
        this.isActive = obj.isActive;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
    }
}