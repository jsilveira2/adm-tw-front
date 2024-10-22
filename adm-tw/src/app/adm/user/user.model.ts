export class User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    loginAttempts?: number;
    isLocked: boolean;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.isActive = user.isActive;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.lastLogin = user.lastLogin;
        this.loginAttempts = user.loginAttempts;
        this.isLocked = user.isLocked;
    }
}