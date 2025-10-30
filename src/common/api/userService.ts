import axios from 'axios';
import apiClient from '../config/axiosConfig';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { UserResponse } from '../interfaces/userInterfaces';

export const getMe = async (): Promise<ResponseWrapper<UserResponse>> => {
  try {
    const response = await apiClient.get<ResponseWrapper<UserResponse>>('users/me');

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }

    throw new Error('An unexpected error occurred while fetching user data.');
  }
};
