import { describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'

describe('Should set a login form', () => {

  it('should toggle a loader depending on the pending prop', async () => {
    const wrapper = shallowMount(LoginForm, {
      props: {
        loginError: '' as string,
        pending: true as boolean
      }
    })
    const loader = wrapper.findComponent({ name: 'CustomLoader'})

    expect(loader.exists()).toBe(true)

    await wrapper.setProps({ pending: false })

    expect(loader.exists()).toBe(false)
  })

  it('should warn with an invalid username error', async () => {
    const wrapper = shallowMount(LoginForm, {
      props: {
        loginError: 'Invalid username' as string,
        pending: false as boolean
      }
    })
    const invalidUsername = wrapper.find('.error-visible') 
    expect(invalidUsername.exists()).toBe(true)
    expect(invalidUsername.attributes('for')).toBe('uname')
    expect(invalidUsername.text()).toBe('forms.username forms.error')
  })

  it('should warn with an invalid password error', async () => {
    const wrapper = shallowMount(LoginForm, {
      props: {
        loginError: 'Invalid password' as string,
        pending: false as boolean
      }
    })
    const invalidPassword = wrapper.find('.error-visible') 
    expect(invalidPassword.exists()).toBe(true)
    expect(invalidPassword.attributes('for')).toBe('pword')
    expect(invalidPassword.text()).toBe('forms.password forms.error')
  })

  it('should emit login values', async () => {
    const wrapper = shallowMount(LoginForm, {
      props: {
        loginError: '' as string,
        pending: false as boolean
      }
    })
    const form = wrapper.find('form')
    const usernameInput = wrapper.find('.todo-input[name="uname"]') 
    const passwordInput = wrapper.find('.todo-input[name="pword"]') 
    const submit = wrapper.find('.todo-button[type="submit"]') 

    expect(submit.attributes('value')).toBe('processes.login')
    
    usernameInput.setValue('toto')
    passwordInput.setValue('Aa1!aaaaaaaa')
    
    form.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['emit-credentials']).toBeTruthy()
  })

  it('shouldn t emit login values when incorrect', async () => {
    const wrapper = shallowMount(LoginForm, {
      props: {
        loginError: '' as string,
        pending: false as boolean
      }
    })
    const form = wrapper.find('form')
    const usernameInput = wrapper.find('.todo-input[name="uname"]') 
    const passwordInput = wrapper.find('.todo-input[name="pword"]') 
    
    usernameInput.setValue('')
    passwordInput.setValue('password')
    
    form.trigger('submit')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted()['emit-credentials']).toBeFalsy()
  })
})