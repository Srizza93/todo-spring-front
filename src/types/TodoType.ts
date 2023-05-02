export interface Todo {
    id?: number
    userId: string
    content: string
    due?: Date
    created: Date
    done: boolean
}

export interface TodoIndex {
    id: number
    text: string
    type: SelectedTodos
    selected: boolean
}

export enum SelectedTodos {
    TODAY = 'TODAY',
    INBOX = 'INBOX',
    DONE = 'DONE'
} 