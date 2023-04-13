import axios from 'axios'
import type { UserProfileList } from '../types/UserType'

interface Credentials { 
    email: string
    password: string
}

export async function getUser(email: string): Promise<UserProfileList> {
    return axios.get(`/api/users/${email}`)
      .then(res => res.data)
      .catch(console.error)
}

export async function postUsers(credentials: Credentials) {
    return axios.post('/api/users', credentials)
      .then(res => res.data)
      .catch(console.error)
}