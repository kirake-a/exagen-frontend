export interface PasswordResetRequest {
    email: string;
    newPassword: string;
    newPasswordConfirm: string;
}

export interface PasswordResetResponse {
    email: string;
    message: string;
}