import axios from 'axios'

export async function getTodos(): Promise<any> {
    return axios.get('/api/todos')
      .then(res => res.data)
      .catch(console.error)
}