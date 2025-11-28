export type SelectableQuestion = {
    id: number;
    text: string;
    category: number;
    type: 'open' | 'closed';
};