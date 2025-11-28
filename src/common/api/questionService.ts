import axios from 'axios';
import exagenApiClient from '../config/exagen/exagenApiConfig';
import type { ResponseWrapper } from '../interfaces/responseWrapper';
import type { QuestionRequest, QuestionResponse } from '../interfaces/questionInterface';
import type { ClosedQuestion, OpenQuestion } from '../interfaces/questionInterface';
import type { Test } from '../interfaces/testInterface';


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

export const deleteQuestion = async (id: string, type:"OPEN"|"CLOSED"): Promise<ResponseWrapper<null>> => {
    try {
        const response = await exagenApiClient.delete<ResponseWrapper<null>>(`/questions/${id}?type=${type}`);
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

export interface QuestionData {
  closedQuestions: ClosedQuestion[];
  openQuestions: OpenQuestion[];
}

export const getAllQuestionsForTest = async (
  test: Test
): Promise<QuestionData> => {
  try {
    const closedQuestionPromises = test.closedQuestionIds.map((id) =>
      getClosedQuestionById(id.toString())
    );
    const openQuestionPromises = test.openQuestionIds.map((id) =>
      getOpenQuestionById(id.toString())
    );

    const [closedResults, openResults] = await Promise.all([
      Promise.all(closedQuestionPromises),
      Promise.all(openQuestionPromises),
    ]);

    const closedQuestions = closedResults
      .filter((res) => res.success)
      .map((res) => res.data as ClosedQuestion);
    const openQuestions = openResults
      .filter((res) => res.success)
      .map((res) => res.data as OpenQuestion);

    return { closedQuestions, openQuestions };
  } catch (error) {
    console.error("Error fetching all questions for test:", error);
    return { closedQuestions: [], openQuestions: [] };
  }
};