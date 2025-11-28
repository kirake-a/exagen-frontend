
export interface LoginRequest {
    email?: string | null;
    username?: string | null;
    password: string;
}

export interface LoginResponse {
    id: string;
    fullName: string;
    email: string;
    token: string;
}