import axios from 'axios';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { UserResponse } from '../interfaces/userInterfaces';
import authApiClient from '../config/auth/authPublicApiConfig';

export const getMe = async (): Promise<ResponseWrapper<UserResponse>> => {
  try {
    const response = await authApiClient.get<ResponseWrapper<UserResponse>>('users/me');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }

    throw new Error('An unexpected error occurred while fetching user data.');
  }
};
