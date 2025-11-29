import type { ClosedQuestion } from "./questionInterface"

export interface Survey{
    title: string,
    surveyStatus: "ACTIVE" | "INACTIVE",
    closedQuestionsIds: number[],
    totalResponses?:number
}

export interface SurveyResponse {
    id: string,
    title: string,
    totalResponses:number,
    status:string,
    closedQuestions: ClosedQuestion[],
}

export interface SurveyAnswerResponse {
    surveyId: number, 
    title: string, 
    totalResponses: number,
    responses: AnswerResponse[],
}

export interface AnswerSurvey {
    questionId: number, 
    selectedAnswer: string
}

export interface AnswerResponse {
    id: number, 
    answeredAt: string,
    selectedAnswer: string,
    questionId?: number,
}
