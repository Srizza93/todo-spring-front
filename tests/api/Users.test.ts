import { beforeEach ,describe, expect, it, vi } from 'vitest';
import { getUser, signupUser } from '@/api/Users'
import axios from 'axios';
import type { Credentials, User } from '@/types/UserType'

let rejectPromise: boolean = false
let rejectMessage: string = ''

vi.mock('axios', () => ({
    default: {
      post: vi.fn(() => {
        if (rejectPromise) {
          if (rejectMessage) {
            return Promise.reject({ response: { data: { message: rejectMessage } } });
          }
          return Promise.reject(new Error('Test error'));
        } else {
          return Promise.resolve({ data: { body: mockUser } });
        }
      }),
    },
  }));

const mockUser: User = {
    id: '123',
    username: 'toto123',
    name: 'toto',
    surname: 'tutu',
    email: 'toto@gmail.com',
    password: 'password',
}

const mockCredentials: Credentials = {
    username: 'toto123',
    password: 'password'
}

describe('Should handle the users with api call', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should login a user', async () => {
        const user: Promise<any> = await getUser(mockCredentials.username, mockCredentials.password);

        expect(user).toStrictEqual(mockUser);
        expect(axios.post).toHaveBeenCalledWith('/api/login', mockCredentials)
    })

    it('should signup a user', async () => {
        const user: Promise<any> = await signupUser(mockUser as User);

        expect(user).toStrictEqual({ body: mockUser});
        expect(axios.post).toHaveBeenCalledWith('/api/signup', mockUser)
    })

    it('shouldn t login a user', async () => {
        rejectPromise = true

        await expect(getUser(mockCredentials.username, mockCredentials.password)).rejects.toThrow('Unknown error occurred.');
        expect(axios.post).toHaveBeenCalledWith('/api/login', mockCredentials)
    })

    it('shouldn t signup a user', async () => {
        rejectPromise = true

        await expect(signupUser(mockUser)).rejects.toThrow('Unknown error occurred.');
        expect(axios.post).toHaveBeenCalledWith('/api/signup', mockUser)
    })

    it('shouldn t login a user and reject with a message', async () => {
        rejectPromise = true
        rejectMessage = 'Rejected with message'

        await expect(getUser(mockCredentials.username, mockCredentials.password)).rejects.toThrow(rejectMessage);
        expect(axios.post).toHaveBeenCalledWith('/api/login', mockCredentials)
    })

    it('shouldn t signup a user and reject with a message', async () => {
        rejectPromise = true
        rejectMessage = 'Rejected with message'

        await expect(signupUser(mockUser)).rejects.toThrow(rejectMessage);
        expect(axios.post).toHaveBeenCalledWith('/api/signup', mockUser)
    })

});
