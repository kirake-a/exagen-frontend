export interface SignUpRequest {
    name: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

export interface SignUpResponse {
    id: string;
    fullName: string;
    email: string;
}
