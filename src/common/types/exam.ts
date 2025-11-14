import type { ClosedQuestion } from "./closedQuestion";
import type { OpenQuestion } from "./openQuestion";


export type Exam = {
    id: number;
    title: string;
    dateCreated: string;
    dateModified: string;
    openQuestions: OpenQuestion[];
    closedQuestions: ClosedQuestion[];
};