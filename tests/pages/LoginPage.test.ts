import { beforeEach, describe, expect, it, vi } from 'vitest'
import { config, shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useStateUserStore } from '@/store/StateUser'
import flushPromises from 'flush-promises'
import type { User, Credentials } from '@/types/UserType'
import LoginPage from '@/pages/LoginPage.vue';

config.global.stubs = {
    RouterLink: true
  }

vi.mock('@/store/StateUserService', () => ({
useStateUserStore: {
    token: '' as string,
    userId: '' as string,
    loggedIn: false as boolean,
    updateToken: vi.fn() as Function,
    updateUserId: vi.fn() as Function,
    setUserStatus: vi.fn() as Function,
}
}));

const mockUser: User = {
    id: '123',
    username: 'toto',
    password: 'Aa!1aaaaa',
    email: 'toto@gmail.com',
    name: 'toto',
    surname: 'tutu',
    accessToken: 'token-123'
} 

const mockCredentials: Credentials = {
    username: 'toto', 
    password: 'Aa!1aaaaa'
} 
let isResolved = false;

vi.mock('@/api/Users', () => ({
    getUser: vi.fn((t) => {
      return new Promise((resolve, reject) => {
        if (!isResolved) {
          resolve(mockUser);
          isResolved = true;
        } else {
          reject(new Error('Test error'));
        }
      });
    }),
  }));

describe('Should handle the login page', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
        vi.useFakeTimers()
    })

    it('should render the signup button', () => {
        const wrapper = shallowMount(LoginPage);
        const routerLink = wrapper.find('router-link-stub')

        expect(routerLink.exists()).toBeTruthy()
        expect(routerLink.attributes('to')).toBe('signup')
    });

    it('should login a valid member', async () => {
        const wrapper = shallowMount(LoginPage);
        const userStore = useStateUserStore()
        const { useRouter } = await import('vue-router');
        const loginForm = wrapper.findComponent({ name: 'LoginForm'})

        expect(loginForm.exists()).toBeTruthy()
        expect(loginForm.attributes('pending')).toBe('false')
        expect(loginForm.attributes('loginerror')).toBe('')
        
        loginForm.vm.$emit('emit-credentials', mockCredentials)
        await flushPromises()

        const emittedCredentials = loginForm.emitted()['emit-credentials'] as unknown[][]

        expect(emittedCredentials).toBeTruthy()
        expect((emittedCredentials[0][0] as { username: string }).username)
          .toEqual(mockCredentials.username)
        expect((emittedCredentials[0][0] as { password: string }).password)
          .toEqual(mockCredentials.password)

        expect(userStore.token).toBe(mockUser.accessToken)
        expect(userStore.userId).toBe(mockUser.id)
        expect(userStore.loggedIn).toBe(true)

        expect(useRouter().push).toHaveBeenCalledWith(expect.objectContaining({
            'path': '/user',
           })
        );
    });

    it('shouldn t login an invalid user and it should throw an error', async () => {
        const wrapper = shallowMount(LoginPage);
        const userStore = useStateUserStore()
        const loginForm = wrapper.findComponent({ name: 'LoginForm'})
        
        loginForm.vm.$emit('emit-credentials', { username: 'tutu', password: mockCredentials.password})
        await flushPromises()
        
        const emittedCredentials = loginForm.emitted()['emit-credentials'] as unknown[][]
        
        expect(emittedCredentials).toBeTruthy()
        expect((emittedCredentials[0][0] as { username: string }).username)
        .toEqual('tutu')
        expect((emittedCredentials[0][0] as { password: string }).password)
        .toEqual(mockCredentials.password)
        
        expect(userStore.token).toBe('')
        expect(userStore.userId).toBe('')
        expect(userStore.loggedIn).toBe(false)

        expect(loginForm.attributes('loginerror')).toBe('Test error')
        
        await vi.runAllTimers()

        expect(loginForm.attributes('loginerror')).toBe('')
    });
  
});
