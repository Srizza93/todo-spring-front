export interface Todo {
    id?: number
    userId: string
    content: string
    due?: string
    created: string
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