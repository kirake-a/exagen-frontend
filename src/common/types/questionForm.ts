export type QuestionType = 'open' | 'closed';

export interface Question {
  questionType: QuestionType;
  questionText: string;

  answers: string[];

  correctAnswerIndex: number | null;
}
