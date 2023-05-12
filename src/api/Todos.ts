import axios from 'axios'
import { SelectedTodos, Todo } from '../types/TodoType'
import { useStateUserStore } from '../store/StateUser'
const store = useStateUserStore()

export async function getTodos(todoType: SelectedTodos, userId: string): Promise<any> {
    return axios.get(`/api/todos/${todoType}/${userId}`, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res.data._embedded?.todoItemList)
      .catch(console.error)
}

export async function postTodo(todo: Todo): Promise<any> {
    return axios.post(`/api/todos`, todo, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res.data)
      .catch(console.error)
}

export async function putTodo(todo: Todo): Promise<any> {
    return axios.put(`/api/todos`, todo, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res.data)
      .catch(console.error)
}

export async function deleteTodo(id: number): Promise<any> {
    return axios.delete(`/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res.data)
      .catch(console.error)
}