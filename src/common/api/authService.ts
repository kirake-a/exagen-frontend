import axios from 'axios';
import type {
  LoginRequest,
  LoginResponse,
} from '../interfaces/logInInterfaces';
import type {
  SignUpRequest,
  SignUpResponse,
} from '../interfaces/signUpInterfaces';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { PasswordResetRequest, PasswordResetResponse } from '../interfaces/passwordResetInterface';
import authApiPublicClient from '../config/auth/authPublicApiConfig';

export const registerUser = async (
  userData: SignUpRequest
): Promise<ResponseWrapper<SignUpResponse>> => {
  try {
    const response = await authApiPublicClient.post<ResponseWrapper<SignUpResponse>>(
      '/auth/signup',
      userData
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }

    throw new Error('An unexpected error occurred during registration.');
  }
};

export const loginUser = async (
  userData: LoginRequest
): Promise<ResponseWrapper<LoginResponse>> => {
  try {
    const response = await authApiPublicClient.post<ResponseWrapper<LoginResponse>>(
      '/auth/login',
      userData
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }

    throw new Error('An unexpected error occurred during login.');
  }
};

export const resetPassword = async (
  userData: PasswordResetRequest
): Promise<ResponseWrapper<PasswordResetResponse>> => {
  try {
    const response = await authApiPublicClient.post<ResponseWrapper<PasswordResetResponse>>(
      '/auth/password-reset',
      userData
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }

    throw new Error('An unexpected error occurred during password reset.');
  }
};

export const saveAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);

  authApiPublicClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  delete authApiPublicClient.defaults.headers.common['Authorization'];
};
