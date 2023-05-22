import axios from 'axios'
import { SelectedTodos, Todo } from '../types/TodoType'
import { useStateUserStore } from '../store/StateUser'

export async function getTodos(todoType: SelectedTodos, userId: string): Promise<any> {
  const store = useStateUserStore()
    return axios.get(`/api/todos/${todoType}/${userId}`, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res.data._embedded?.todoItemList)
      .catch(console.error)
}

export async function postTodo(todo: Todo): Promise<any> {
  const store = useStateUserStore()
    return axios.post(`/api/todos`, todo, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res)
      .catch(console.error)
}

export async function putTodo(todo: Todo): Promise<any> {
  const store = useStateUserStore()
    return axios.put(`/api/todos`, todo, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res)
      .catch(console.error)
}

export async function deleteTodo(id: number): Promise<any> {
  const store = useStateUserStore()
    return axios.delete(`/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${store.$state.token}`
      }
    })
      .then(res => res)
      .catch(console.error)
}