export interface Test {
    id?: number,
    title: string,
    userId?: string,
    openQuestionIds:number[],
    closedQuestionIds:number[],
    categoryId:number
}