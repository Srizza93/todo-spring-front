import axios from 'axios'
import type { User } from '../types/UserType'

export async function getUser(email: string, password: string): Promise<User> {
    return axios.post(`/api/users`, {email, password})
      .then(res => res.data)
      .catch(console.error)
}