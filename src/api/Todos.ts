import axios from 'axios'
import { SelectedTodos, Todo } from '../types/TodoType'

export async function getTodos(todoType: SelectedTodos, userId: string): Promise<any> {
    return axios.get(`/api/todos/${todoType}/${userId}`)
      .then(res => res.data._embedded?.todoItemList)
      .catch(console.error)
}

export async function postTodo(todo: Todo): Promise<any> {
    return axios.post(`/api/todos`, todo)
      .then(res => res.data)
      .catch(console.error)
}

export async function putTodo(todo: Todo): Promise<any> {
    return axios.put(`/api/todos`, todo)
      .then(res => res.data)
      .catch(console.error)
}

export async function deleteTodo(id: number): Promise<any> {
    return axios.delete(`/api/todos/${id}`)
      .then(res => res.data)
      .catch(console.error)
}