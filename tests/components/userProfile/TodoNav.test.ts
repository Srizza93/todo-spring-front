import { beforeEach, describe, expect, it, vi } from 'vitest'
import { config, shallowMount } from '@vue/test-utils'
import TodoNav from '@/components/userProfile/TodoNav.vue'
import { SelectedTodos } from "@/types/TodoType"
import { useStateUserStore } from '@/store/StateUser'
import { setActivePinia, createPinia } from 'pinia'

config.global.stubs = {
    RouterLink: true
  }

describe('Should handle a todo modal', () => {

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should emit the todos type selected', async () => {
    const wrapper = shallowMount(TodoNav, {
      props: {
        selectedTodos: SelectedTodos.TODAY,
      }
    })

    const buttons = wrapper.findAll('[data-test-id="typeButton"]')

    expect(buttons.length).toBe(3)
    expect(buttons[0].text()).toBe('userProfile.today')
    expect(buttons[1].text()).toBe('userProfile.inbox')
    expect(buttons[2].text()).toBe('userProfile.done')

    buttons[1].trigger('click')
    await wrapper.vm.$nextTick()

    const emittedSubmit = wrapper.emitted()['emit-select'] as unknown[][]

    expect(emittedSubmit).toBeTruthy()
    expect((emittedSubmit[0][0] as { selected: SelectedTodos })).toEqual(SelectedTodos.INBOX)
  })

  it('should logout', async () => {
    const wrapper = shallowMount(TodoNav, {
      props: {
        selectedTodos: SelectedTodos.TODAY,
      }
    })

    const userStore = useStateUserStore()
    const logoutButton = wrapper.find('.settings_logout_button')
    
    userStore.updateToken('123')
    userStore.updateUserId('abc')
    userStore.setUserStatus(true)

    expect(userStore.token).toBe('123')
    expect(userStore.userId).toBe('abc')
    expect(userStore.loggedIn).toBeTruthy()
    expect(logoutButton.exists()).toBeTruthy()

    logoutButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(userStore.token).toBe('')
    expect(userStore.userId).toBe('')
    expect(userStore.loggedIn).toBeFalsy()
  })
})