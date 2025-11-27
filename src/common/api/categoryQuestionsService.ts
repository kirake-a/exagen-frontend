import axios from 'axios';
import exagenApiClient from '../config/exagenApiConfig';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { Category } from '../interfaces/categoryInterface';

export const getCategoryQuestions = async (): Promise<ResponseWrapper<Category[]>> => {
  try {
    console.log("Entreee a CategoryQuestionService");
    const response = await exagenApiClient.get<ResponseWrapper<Category[]>>('/categories/');
    return response.data;
    } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
    }

    throw new Error('An unexpected error occurred while fetching categories tests.');
  }
};

export const getCategoryQuestionById = async (id: string): Promise<ResponseWrapper<Category>> => {
  try {
    const response = await exagenApiClient.get<ResponseWrapper<Category>>(`/categories/${id}`);   
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('An unexpected error occurred while fetching the category test.');
  }
};

export const createCategoryQuestion = async (
  name: string
): Promise<ResponseWrapper<Category>> => {
  try {
    const response = await exagenApiClient.post<ResponseWrapper<Category>>(
      `/categories/?name=${encodeURIComponent(name)}`
    );

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw new Error('An unexpected error occurred while creating the category test.');
  }
};

export const deleteCategoryQuestion = async (id: string): Promise<ResponseWrapper<null>> => {
  try {
    const response = await exagenApiClient.delete<ResponseWrapper<null>>(`/categories/${id}`);    
    return response.data;
    } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
        return error.response.data;
    }
    throw new Error('An unexpected error occurred while deleting the category test.');
  }
};