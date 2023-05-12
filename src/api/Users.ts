import axios from 'axios'
import type { User } from '../types/UserType'


export async function getUser(username: string, password: string): Promise<User> {
    return axios.post(`/api/login`, { username, password })
      .then(res => {
        return res.data.body
      })
      .catch(err => {
        if (err.response && err.response.data) {
          throw new Error(err.response.data.message);
        } else {
          throw new Error('Unknown error occurred.');
        }
      })
}

export async function signupUser(newUser: User): Promise<User> {
    return axios.post(`/api/signup`, newUser)
      .then(res => res.data)
      .catch(err => {
        if (err.response && err.response.data) {
          throw new Error(err.response.data.message);
        } else {
          throw new Error('Unknown error occurred.');
        }
      })
}