import { beforeEach, describe, expect, it, vi } from 'vitest'
import { config, shallowMount } from '@vue/test-utils'
import TodosComponent from '@/components/userProfile/TodosComponent.vue'
import { SelectedTodos, Todo } from "@/types/TodoType"

const todos: Todo[] = [
    {
        id: 1,
        userId: '123',
        content: 'abc',
        created: new Date('2023-05-17'),
        done: false
    },
    {
        id: 2,
        userId: '456',
        content: 'def',
        created: new Date(),
        done: true
    },
    {
        id: 3,
        userId: '789',
        content: 'ghi',
        created: new Date(),
        due: new Date('2022-05-05'),
        done: false
    },
    {
        id: 4,
        userId: '789',
        content: 'ghi',
        created: new Date(),
        due: new Date('2024-05-05'),
        done: false
    },
]


describe('Should render a todo component', () => {

  it('should render all the todos', async () => {
    const wrapper = shallowMount(TodosComponent, {
      props: {
        selectedTodos: SelectedTodos.TODAY,
        todos: todos,
        today: new Date()
      }
    })

    const todosElements = wrapper.findAll('.todos_todo')
    
    expect(todosElements).toHaveLength(4)
    expect(todosElements[0].find('.todos_todo_due').exists()).toBeFalsy()
    expect(todosElements[0].find('.todos_todo_created').text()).toBe('userProfile.created: 2023-05-17')
    expect(todosElements[2].find('.todos_todo_due').exists()).toBeTruthy()
    expect(todosElements[3].find('.todos_todo_due').exists()).toBeTruthy()
    expect(todosElements[2].find('.todos_todo_due b').text()).toBe('userProfile.expired:')
    expect(todosElements[2].find('.todos_todo_due span').text()).toBe('2022-05-05')
    expect(todosElements[3].find('.todos_todo_due b').text()).toBe('userProfile.due:')
    expect(todosElements[3].find('.todos_todo_due span').text()).toBe('2024-05-05')
  })

  it('should emit the delete event', async () => {
    const wrapper = shallowMount(TodosComponent, {
        props: {
          selectedTodos: SelectedTodos.TODAY,
          todos: todos,
          today: new Date()
        }
      })

    const todosElements = wrapper.findAll('.todos_todo')
    const deleteButton = todosElements[0].find('.todos_todo_middle_content_icons_trash')

    deleteButton.trigger('click')
    await wrapper.vm.$nextTick()

    const emittedDelete = wrapper.emitted()['emit-delete'] as unknown[][]

    expect(emittedDelete).toBeTruthy()
    expect((emittedDelete[0][0] as { id: number })).toEqual(1)
  })

  it('should emit the done event', async () => {
    const wrapper = shallowMount(TodosComponent, {
        props: {
          selectedTodos: SelectedTodos.TODAY,
          todos: todos,
          today: new Date()
        }
      })

    const todosElements = wrapper.findAll('.todos_todo')
    const doneButton = todosElements[0].find('.todos_todo_middle_content_icons_check')

    doneButton.trigger('click')
    await wrapper.vm.$nextTick()

    const emittedDone = wrapper.emitted()['emit-done'] as unknown[][]

    expect(emittedDone).toBeTruthy()
    expect((emittedDone[0][0] as { todo: Todo })).toEqual(todos[0])
  })

  it('should emit the retrieve event', async () => {
    const wrapper = shallowMount(TodosComponent, {
        props: {
          selectedTodos: SelectedTodos.DONE,
          todos: todos,
          today: new Date()
        }
      })

    const todosElements = wrapper.findAll('.todos_todo')
    const retrieveButton = todosElements[1].find('.todos_todo_middle_content_icons_retrieve')

    retrieveButton.trigger('click')
    await wrapper.vm.$nextTick()

    const emittedRetrieve = wrapper.emitted()['emit-done'] as unknown[][]

    expect(emittedRetrieve).toBeTruthy()
    expect((emittedRetrieve[0][0] as { todo: Todo })).toEqual(todos[1])
  })
})