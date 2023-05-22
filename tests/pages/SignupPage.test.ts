import { beforeEach, describe, expect, it, vi } from 'vitest'
import { config, shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import SignupPage from '@/pages/SignupPage.vue'

config.global.stubs = {
    RouterLink: true
}

const errorMessages: {
    [key: string]: string
} = {
    username: 'This username has been used already',
    name: 'The name format is not valid',
    surname: 'The surname format is not valid',
    emailFormat: 'The email format is not valid',
    emailUsed: 'This email has been used already',
    password: 'The password format is not valid',
}

vi.mock('@/api/Users', () => ({
    signupUser: vi.fn()
}))

import { signupUser } from '@/api/Users'

describe('Should handle the signup page', () => {

    beforeEach(() => {
        vi.useFakeTimers()
    })

    it('should signup with valid inputs', async () => {
        signupUser.mockImplementation(() => new Promise((res, rej)  => res(200)))
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')
        const submit = wrapper.find('.signup_form_section_signup')

        const username: any = wrapper.find('[data-test-id="username"]')
        const name: any = wrapper.find('[data-test-id="name"]')
        const surname: any = wrapper.find('[data-test-id="surname"]')
        const email: any = wrapper.find('[data-test-id="email"]')
        const password: any = wrapper.find('[data-test-id="password"]')
        const confPassword: any = wrapper.find('[data-test-id="confPassword"]')
        const successMessage = wrapper.find('.success')

        username.setValue('toto93')
        name.setValue('toto')
        surname.setValue('toto')
        email.setValue('toto@gmail.com')
        password.setValue('A1!aaaaaaa')
        confPassword.setValue('A1!aaaaaaa')

        expect(submit.exists()).toBeTruthy()
        expect(submit.attributes('value')).toBe('processes.signup')
        
        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).toContain('success-visible')

        await vi.runAllTimers()

        expect(username.element.value).toBe('')
        expect(name.element.value).toBe('')
        expect(surname.element.value).toBe('')
        expect(email.element.value).toBe('')
        expect(password.element.value).toBe('')
        expect(confPassword.element.value).toBe('')
    });
  
});

describe('Errors handling', () => {

    beforeEach(() => {
        vi.useFakeTimers()
    })

    it('should throw the username error', async () => {
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')

        const username = wrapper.find('[data-test-id="username"]')
        const usernameError = wrapper.find('[data-test-id="usernameError"]')
        const successMessage = wrapper.find('.success')

        username.setValue('!!')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(usernameError.classes()).toContain('error-visible')
        expect(usernameError.text()).toBe('forms.username forms.error')
    });

    it('should throw the name error', async () => {
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')

        const name = wrapper.find('[data-test-id="name"]')
        const nameError = wrapper.find('[data-test-id="nameError"]')
        const successMessage = wrapper.find('.success')

        name.setValue('123')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(nameError.classes()).toContain('error-visible')
        expect(nameError.text()).toBe('forms.name forms.error')
    });

    it('should throw the surname error', async () => {
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')

        const surnameError = wrapper.find('[data-test-id="surnameError"]')
        const surname = wrapper.find('[data-test-id="surname"]')
        const successMessage = wrapper.find('.success')

        surname.setValue('1&')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(surnameError.classes()).toContain('error-visible')
        expect(surnameError.text()).toBe('forms.surname forms.error')
    });

    it('should throw the email error', async () => {
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')

        const email = wrapper.find('[data-test-id="email"]')
        const successMessage = wrapper.find('.success')
        
        email.setValue('totogmailcom')
        
        form.trigger('submit')
        await flushPromises()

        const emailError = wrapper.find('[data-test-id="emailError"]')
        expect(successMessage.classes()).not.toContain('success-visible')
        expect(emailError.classes()).toContain('error-visible')
        expect(emailError.text()).toBe('forms.email forms.error')
    });

    it('should throw the password error', async () => {
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')

        const passwordError = wrapper.find('[data-test-id="passwordError"]')
        const password = wrapper.find('[data-test-id="password"]')
        const successMessage = wrapper.find('.success')

        password.setValue('!aaaaaaa')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(passwordError.classes()).toContain('error-visible')
        expect(passwordError.text()).toBe('forms.password forms.error')
    });

    it('should throw the confirm password error', async () => {
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')

        const confPasswordError = wrapper.find('[data-test-id="confPasswordError"]')
        const confPassword = wrapper.find('[data-test-id="confPassword"]')
        const successMessage = wrapper.find('.success')

        confPassword.setValue('1!aaaaaaa')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(confPasswordError.classes()).toContain('error-visible')
        expect(confPasswordError.text()).toBe('forms.confPasswordError')
    });

    it('should catch the username API error', async () => {
        signupUser.mockImplementation(() => new Promise((res, rej)  => rej(new Error(errorMessages.username))))

        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')
        const usernameError = wrapper.find('[data-test-id="usernameError"]')
        const successMessage = wrapper.find('.success')
        const username: any = wrapper.find('[data-test-id="username"]')
        const name: any = wrapper.find('[data-test-id="name"]')
        const surname: any = wrapper.find('[data-test-id="surname"]')
        const email: any = wrapper.find('[data-test-id="email"]')
        const password: any = wrapper.find('[data-test-id="password"]')
        const confPassword: any = wrapper.find('[data-test-id="confPassword"]')

        username.setValue('toto93')
        name.setValue('toto')
        surname.setValue('toto')
        email.setValue('toto@gmail.com')
        password.setValue('A1!aaaaaaa')
        confPassword.setValue('A1!aaaaaaa')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(usernameError.classes()).toContain('error-visible')
        expect(usernameError.text()).toBe('forms.username forms.error')

        await vi.runAllTimers()
        
        expect(username.element.value).toBe('')
        expect(name.element.value).toBe('')
        expect(surname.element.value).toBe('')
        expect(email.element.value).toBe('')
        expect(password.element.value).toBe('')
        expect(confPassword.element.value).toBe('')
    });

    it('should catch the name API error', async () => {
        signupUser.mockImplementation(() => new Promise((res, rej)  => rej(new Error(errorMessages.name))))

        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')
        const nameError = wrapper.find('[data-test-id="nameError"]')
        const successMessage = wrapper.find('.success')
        const username: any = wrapper.find('[data-test-id="username"]')
        const name: any = wrapper.find('[data-test-id="name"]')
        const surname: any = wrapper.find('[data-test-id="surname"]')
        const email: any = wrapper.find('[data-test-id="email"]')
        const password: any = wrapper.find('[data-test-id="password"]')
        const confPassword: any = wrapper.find('[data-test-id="confPassword"]')
        const passwordError = wrapper.find('[data-test-id="passwordError"]')

        username.setValue('toto93')
        name.setValue('toto')
        surname.setValue('toto')
        email.setValue('toto@gmail.com')
        password.setValue('A1!aaaaaaa')
        confPassword.setValue('A1!aaaaaaa')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(nameError.classes()).toContain('error-visible')
        expect(nameError.text()).toBe('forms.name forms.error')

        await vi.runAllTimers()
        
        expect(username.element.value).toBe('')
        expect(name.element.value).toBe('')
        expect(surname.element.value).toBe('')
        expect(email.element.value).toBe('')
        expect(password.element.value).toBe('')
        expect(confPassword.element.value).toBe('')
    });

    it('should catch the surname API error', async () => {
        signupUser.mockImplementation(() => new Promise((res, rej)  => rej(new Error(errorMessages.surname))))

        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')
        const surnameError = wrapper.find('[data-test-id="surnameError"]')
        const successMessage = wrapper.find('.success')
        const username: any = wrapper.find('[data-test-id="username"]')
        const name: any = wrapper.find('[data-test-id="name"]')
        const surname: any = wrapper.find('[data-test-id="surname"]')
        const email: any = wrapper.find('[data-test-id="email"]')
        const password: any = wrapper.find('[data-test-id="password"]')
        const confPassword: any = wrapper.find('[data-test-id="confPassword"]')

        username.setValue('toto93')
        name.setValue('toto')
        surname.setValue('toto')
        email.setValue('toto@gmail.com')
        password.setValue('A1!aaaaaaa')
        confPassword.setValue('A1!aaaaaaa')

        form.trigger('submit')
        await flushPromises()

        expect(successMessage.classes()).not.toContain('success-visible')
        expect(surnameError.classes()).toContain('error-visible')
        expect(surnameError.text()).toBe('forms.surname forms.error')

        await vi.runAllTimers()
        
        expect(username.element.value).toBe('')
        expect(name.element.value).toBe('')
        expect(surname.element.value).toBe('')
        expect(email.element.value).toBe('')
        expect(password.element.value).toBe('')
        expect(confPassword.element.value).toBe('')
    });

    it('should catch the emailFormat API error', async () => {
        signupUser.mockImplementation(() => new Promise((res, rej)  => rej(new Error(errorMessages.emailFormat))))
        
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')
        const successMessage = wrapper.find('.success')
        const username: any = wrapper.find('[data-test-id="username"]')
        const name: any = wrapper.find('[data-test-id="name"]')
        const surname: any = wrapper.find('[data-test-id="surname"]')
        const email: any = wrapper.find('[data-test-id="email"]')
        const password: any = wrapper.find('[data-test-id="password"]')
        const confPassword: any = wrapper.find('[data-test-id="confPassword"]')

        username.setValue('toto93')
        name.setValue('toto')
        surname.setValue('toto')
        email.setValue('toto@gmail.com')
        password.setValue('A1!aaaaaaa')
        confPassword.setValue('A1!aaaaaaa')
        
        form.trigger('submit')
        await flushPromises()
        
        const emailError = wrapper.find('[data-test-id="emailError"]')
        expect(successMessage.classes()).not.toContain('success-visible')
        expect(emailError.classes()).toContain('error-visible')
        expect(emailError.text()).toBe('forms.email forms.error')

        await vi.runAllTimers()
        
        expect(username.element.value).toBe('')
        expect(name.element.value).toBe('')
        expect(surname.element.value).toBe('')
        expect(email.element.value).toBe('')
        expect(password.element.value).toBe('')
        expect(confPassword.element.value).toBe('')
    });

    it('should catch the emailUsed API error', async () => {
        signupUser.mockImplementation(() => new Promise((res, rej)  => rej(new Error(errorMessages.emailUsed))))
        
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')
        const successMessage = wrapper.find('.success')
        const username: any = wrapper.find('[data-test-id="username"]')
        const name: any = wrapper.find('[data-test-id="name"]')
        const surname: any = wrapper.find('[data-test-id="surname"]')
        const email: any = wrapper.find('[data-test-id="email"]')
        const password: any = wrapper.find('[data-test-id="password"]')
        const confPassword: any = wrapper.find('[data-test-id="confPassword"]')
        const emailError: any = wrapper.find('[data-test-id="emailUsed"]')

        username.setValue('toto93')
        name.setValue('toto')
        surname.setValue('toto')
        email.setValue('toto@gmail.com')
        password.setValue('A1!aaaaaaa')
        confPassword.setValue('A1!aaaaaaa')
        
        form.trigger('submit')
        await flushPromises()
        
        expect(successMessage.classes()).not.toContain('success-visible')
        expect(emailError.classes()).toContain('error-visible')
        expect(emailError.text()).toBe('forms.email forms.hasBeenUsed')

        await vi.runAllTimers()
        
        expect(username.element.value).toBe('')
        expect(name.element.value).toBe('')
        expect(surname.element.value).toBe('')
        expect(email.element.value).toBe('')
        expect(password.element.value).toBe('')
        expect(confPassword.element.value).toBe('')
    });
    
    it('should catch the password API error', async () => {
        signupUser.mockImplementation(() => new Promise((res, rej)  => rej(new Error(errorMessages.password))))
        
        const wrapper = shallowMount(SignupPage)
        const form = wrapper.find('.signup_form')
        const username: any = wrapper.find('[data-test-id="username"]')
        const name: any = wrapper.find('[data-test-id="name"]')
        const surname: any = wrapper.find('[data-test-id="surname"]')
        const email: any = wrapper.find('[data-test-id="email"]')
        const password: any = wrapper.find('[data-test-id="password"]')
        const confPassword: any = wrapper.find('[data-test-id="confPassword"]')
        const passwordError = wrapper.find('[data-test-id="passwordError"]')
        const successMessage = wrapper.find('.success')
        
        username.setValue('toto93')
        name.setValue('toto')
        surname.setValue('toto')
        email.setValue('toto@gmail.com')
        password.setValue('A1!aaaaaaa')
        confPassword.setValue('A1!aaaaaaa')

        form.trigger('submit')
        await flushPromises()
        
        expect(successMessage.classes()).not.toContain('success-visible')
        expect(passwordError.classes()).toContain('error-visible')
        expect(passwordError.text()).toBe('forms.password forms.error')
        
        await vi.runAllTimers()
        
        expect(username.element.value).toBe('')
        expect(name.element.value).toBe('')
        expect(surname.element.value).toBe('')
        expect(email.element.value).toBe('')
        expect(password.element.value).toBe('')
        expect(confPassword.element.value).toBe('')
    });

});


