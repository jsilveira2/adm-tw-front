export class Guild {
    id?: string;
    name: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(obj: Guild) {
        this.id = obj.id;
        this.name = obj.name;
        this.isActive = obj.isActive;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
    }
}