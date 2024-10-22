interface User {
    id: string;
    email: string;
    name: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}