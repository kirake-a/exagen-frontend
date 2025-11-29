import axios from 'axios';
import exagenApiClient from '../config/exagen/exagenApiConfig';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { AnswerSurvey, Survey, SurveyAnswerResponse, SurveyResponse } from '../interfaces/surveyInterfaces';
import exagenApiPublicClient from '../config/exagen/exagenApiPublicConfig';


export const getSurveys = async (): Promise<ResponseWrapper<SurveyResponse[]>> => {
    try {  
        const response = await exagenApiClient.get<ResponseWrapper<SurveyResponse[]>>('/surveys/');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while fetching Surveys.');
    }
}

export const createSurveys = async (surveyData: Survey): Promise<ResponseWrapper<Survey>> => {
    try {
        const response = await exagenApiClient.post<ResponseWrapper<Survey>>('/surveys/', surveyData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while creating the Survey.');
    }
}

export const deleteSurvey = async (id: string): Promise<ResponseWrapper<null>> => {
    try {
        const response = await exagenApiClient.delete<ResponseWrapper<null>>(`/surveys/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while deleting the Survey.');
    }
}

export const getSurveyById = async (id: string): Promise<ResponseWrapper<SurveyResponse>> => {
    try {
        const response = await exagenApiPublicClient.get<ResponseWrapper<SurveyResponse>>(`/surveys/${id}`);    
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }   
        throw new Error('An unexpected error occurred while fetching the Survey.');
    }
};

export const createSurveyResponse = async (id:string, answers: AnswerSurvey[] ): Promise<ResponseWrapper<Survey>> => {
    try {
        const response = await exagenApiPublicClient.post<ResponseWrapper<Survey>>(`/surveys/${id}/responses`, answers);   
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while creatind the survey response.');
    }
}

export const getSurveyResponse = async (id: string): Promise<ResponseWrapper<SurveyAnswerResponse>> => {
    try {
        const response = await exagenApiClient.get<ResponseWrapper<SurveyAnswerResponse>>(`/surveys/${id}/responses`);   
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        }
        throw new Error('An unexpected error occurred while fetching the survey response.');
    }
};