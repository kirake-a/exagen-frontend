export interface Test {
    id?: number,
    title: string,
    userId?: string,
    openQuestionsIds:number[],
    closedQuestionsIds:number[],
    categoryId:number
}