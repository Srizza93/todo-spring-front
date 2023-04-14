import axios from 'axios'
import type { User } from '../types/UserType'

export async function getUser(email: string): Promise<User> {
    return axios.get(`/api/users/${email}`)
      .then(res => res.data)
      .catch(console.error)
}