import axios from 'axios';
import exagenApiClient from '../config/exagenApiConfig';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { Test } from '../interfaces/testInterface';


export const getTests = async (): Promise<ResponseWrapper<Test>> => {
    try {  
        const response = await exagenApiClient.get<ResponseWrapper<Test>>('/tests/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while fetching Tests.');
    }
}

export const createTest = async (questionData: Test): Promise<ResponseWrapper<Test>> => {
    try {
        const response = await exagenApiClient.post<ResponseWrapper<Test>>('/tests/', questionData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while creating the test.');
    }
}

export const deleteTest = async (id: string): Promise<ResponseWrapper<null>> => {
    try {
        const response = await exagenApiClient.delete<ResponseWrapper<null>>(`/tests/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while deleting the test.');
    }
}

export const getTestById = async (id: string): Promise<ResponseWrapper<Test>> => {
    try {
        const response = await exagenApiClient.get<ResponseWrapper<Test>>(`/tests/${id}`);    
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }   
        throw new Error('An unexpected error occurred while fetching the test.');
    }
};

export const getTestByUserId = async (id: string): Promise<ResponseWrapper<Test>> => {
    try {
        const response = await exagenApiClient.get<ResponseWrapper<Test>>(`/tests/user/${id}`);   
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while fetching the question.');
    }
};