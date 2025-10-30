import axios from 'axios';
import type {
  LoginRequest,
  LoginResponse,
} from '../interfaces/logInInterfaces';
import type {
  SignUpRequest,
  SignUpResponse,
} from '../interfaces/signUpInterfaces';
import type { ResponseWrapper } from '../../../common/interfaces/responseWrapper';
import apiClient from '../../../common/config/axiosConfig';

export const registerUser = async (
  userData: SignUpRequest
): Promise<ResponseWrapper<SignUpResponse>> => {
  try {
    const response = await apiClient.post<ResponseWrapper<SignUpResponse>>(
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
    const response = await apiClient.post<ResponseWrapper<LoginResponse>>('/auth/login', userData);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }

    throw new Error('An unexpected error occurred during login.');
  }
};

export const saveAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);

  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  delete apiClient.defaults.headers.common['Authorization'];
};
