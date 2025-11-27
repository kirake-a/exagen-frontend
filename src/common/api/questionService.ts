import axios from 'axios';
import exagenApiClient from '../config/exagenApiConfig';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { QuestionRequest, QuestionResponse } from '../interfaces/questionInterface';
import type { ClosedQuestion } from '../types/closedQuestion';
import type { OpenQuestion } from '../types/openQuestion';


export const getQuestions = async (): Promise<ResponseWrapper<QuestionResponse>> => {
    try {  
        const response = await exagenApiClient.get<ResponseWrapper<QuestionResponse>>('/questions/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while fetching questions.');
    }
}

export const createQuestion = async (questionData: QuestionRequest): Promise<ResponseWrapper<QuestionResponse>> => {
    try {
        const response = await exagenApiClient.post<ResponseWrapper<QuestionResponse>>('/questions/', questionData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while creating the question.');
    }
}

export const deleteQuestion = async (id: string): Promise<ResponseWrapper<null>> => {
    try {
        const response = await exagenApiClient.delete<ResponseWrapper<null>>(`/questions/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while deleting the question.');
    }
}

export const getClosedQuestionById = async (id: string): Promise<ResponseWrapper<ClosedQuestion>> => {
    try {
        const response = await exagenApiClient.get<ResponseWrapper<ClosedQuestion>>(`/questions/closed/${id}`);    
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }   
        throw new Error('An unexpected error occurred while fetching the question.');
    }
};

export const getOpenQuestionById = async (id: string): Promise<ResponseWrapper<OpenQuestion>> => {
    try {
        const response = await exagenApiClient.get<ResponseWrapper<OpenQuestion>>(`/questions/open/${id}`);   
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while fetching the question.');
    }
};