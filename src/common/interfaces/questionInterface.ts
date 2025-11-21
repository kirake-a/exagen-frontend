import type { QuestionType } from '../../common/types/questionForm';

export interface QuestionData {
  questionType: QuestionType;
  questionText: string;
  answers: string[];
  correctAnswerIndex: number | null;
}