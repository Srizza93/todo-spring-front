import { describe, expect, it } from 'vitest'
import { VueWrapper, shallowMount } from '@vue/test-utils'
import TodoModal from '@/components/userProfile/TodoModal.vue'

describe('Should handle a todo modal', () => {

  it('should emit the data of the modal', async () => {
    const wrapper: VueWrapper<TodoModal> = shallowMount(TodoModal, {
      props: {
        today: new Date('2023-05-17') as Date,
      }
    })
    const modal = wrapper.find('.modal')
    const textarea = wrapper.find('.modal_text-box')
    const dueDate = wrapper.find('.modal_calendar_container_input')

    expect(textarea.exists()).toBe(true)
    expect(dueDate.exists()).toBe(true)

    textarea.setValue('hello world')
    dueDate.setValue('2023-05-17')

    modal.trigger('submit')

    await wrapper.vm.$nextTick()

    const emittedSubmit = wrapper.emitted()['emit-submit'] as unknown[][]

    expect(emittedSubmit).toBeTruthy()
    expect((emittedSubmit[0][0] as { dueDate: string }).dueDate).toEqual('2023-05-17')
    expect((emittedSubmit[0][0] as { content: string }).content).toEqual('hello world')
  })

  it('should emit the closure of the modal', async () => {
    const wrapper = shallowMount(TodoModal, {
      props: {
        today: new Date() as Date
      } 
    })
    const closeButton = wrapper.find('.modal_close-button')

    closeButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('emit-closure')).toBeTruthy()
  })
})