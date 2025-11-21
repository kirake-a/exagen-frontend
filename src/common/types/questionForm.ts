export type QuestionType = 'open' | 'closed';

export interface QuestionData {
  questionType: QuestionType;
  questionText: string;

  answers: string[];

  correctAnswerIndex: number | null;
}
