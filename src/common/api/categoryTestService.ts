import axios from 'axios';
import exagenApiClient from '../config/exagen/exagenApiConfig';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { Category } from '../interfaces/categoryInterface';

export const getCategoryTests = async (): Promise<ResponseWrapper<Category[]>> => {
  try {
    console.log("Entreee a categoryTestService");
    const response = await exagenApiClient.get<ResponseWrapper<Category[]>>('/test-categories/');
    return response.data;
    } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
    }

    throw new Error('An unexpected error occurred while fetching categories tests.');
  }
};

export const getCategoryTestById = async (id: string): Promise<ResponseWrapper<Category>> => {
  try {
    const response = await exagenApiClient.get<ResponseWrapper<Category>>(`/test-categories/${id}`);   
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('An unexpected error occurred while fetching the category test.');
  }
};

export const createCategoryTest = async (
  name: string
): Promise<ResponseWrapper<Category>> => {
  try {
    const response = await exagenApiClient.post<ResponseWrapper<Category>>(
      `/test-categories/?name=${encodeURIComponent(name)}`
    );

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('An unexpected error occurred while creating the category test.');
  }
};