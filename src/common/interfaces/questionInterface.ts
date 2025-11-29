export interface QuestionResponse { 
  closedQuestions: ClosedQuestion[],
  openQuestions: OpenQuestion[]
}

export interface QuestionRequest {
  categoryId: number, 
  questions : {
    closedQuestions: ClosedQuestion[],
    openQuestions: OpenQuestion[]
  }
}
export interface OpenQuestion {
  id?: number, 
  statement: string,
  response: string,
  categoryId?: number,
}

export interface ClosedQuestion {
  id?: number, 
  statement: string, 
  options: string[],
  correctAnswer: string, 
  categoryId?: number,
}