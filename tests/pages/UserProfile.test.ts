import { beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { Todo, SelectedTodos } from '@/types/TodoType'
import UserProfile from '@/pages/UserProfile.vue'
import { getTodos } from '@/api/Todos'

const mockTodos: Todo[] = [
    {
        id: 1,
        userId: '123',
        content: 'I m a content',
        due: new Date('2030-05-05'),
        created: new Date('2020-05-05'),
        done: false
    },
    {
        id: 2,
        userId: '456',
        content: 'I m a content',
        due: new Date('2030-04-05'),
        created: new Date('2020-04-05'),
        done: false
    },
    {
        id: 3,
        userId: '789',
        content: 'I m a content',
        due: new Date('2030-03-05'),
        created: new Date('2020-03-05'),
        done: true
    },
]

vi.mock('@/store/StateUserService', () => ({
    useStateUserStore: {
        userId: 'id-123' as string,
    }
}));

vi.mock('@/api/Todos', () => ({
    getTodos: vi.fn((t) => Promise.resolve(mockTodos)),
    postTodo: vi.fn((t) => Promise.resolve(200)),
    putTodo: vi.fn((t) => Promise.resolve(200)),
    deleteTodo: vi.fn((t) => Promise.resolve(200)),
}));

describe('Should handle the user profile page', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('should render the navbar', () => {
        const wrapper = shallowMount(UserProfile);
        const navBar = wrapper.findComponent({ name: 'TodoNav' })

        expect(navBar.exists()).toBeTruthy()
    });

    it('shouldn t display the add button when showing DONE todos', async () => {
        const wrapper = shallowMount(UserProfile);
        const navBar = wrapper.findComponent({ name: 'TodoNav' })

        expect(navBar.exists()).toBeTruthy()
        
        navBar.vm.$emit('emit-select', SelectedTodos.DONE)
        await wrapper.vm.$nextTick()
        
        const addTodoButton = wrapper.find('.profile_add_icon')
        expect(addTodoButton.exists()).toBeFalsy()
    });

    it('should render the add button and todo modal', async () => {
        const wrapper = shallowMount(UserProfile);
        const addTodoButton = wrapper.find('.profile_add_icon')
        let todoModal = wrapper.findComponent({ name: 'TodoModal'})

        expect(addTodoButton.exists()).toBeTruthy()
        expect(todoModal.exists()).toBeFalsy()
    });

    it('should add a todo and close the modal', async () => {
        const wrapper = shallowMount(UserProfile);
        const addTodoButton = wrapper.find('.profile_add_icon')
        let todoModal = wrapper.findComponent({ name: 'TodoModal'})
        const { postTodo } = await import('@/api/Todos')

        addTodoButton.trigger('click')
        await wrapper.vm.$nextTick()

        todoModal = wrapper.findComponent({ name: 'TodoModal'})
        expect(todoModal.exists()).toBeTruthy()

        todoModal.trigger('emit-submit', { dueDate: mockTodos[0].due, content: mockTodos[0].content})
        await wrapper.vm.$nextTick()

        expect(postTodo).toBeCalled()
        todoModal = wrapper.findComponent({ name: 'TodoModal'})
        expect(todoModal.exists()).toBeFalsy()
        
    });

    it('should close the todo modal', async () => {
        const wrapper = shallowMount(UserProfile);
        const addTodoButton = wrapper.find('.profile_add_icon')

        addTodoButton.trigger('click')
        await wrapper.vm.$nextTick()

        let todoModal = wrapper.findComponent({ name: 'TodoModal'})

        todoModal.trigger('emit-closure')
        await wrapper.vm.$nextTick()

        todoModal = wrapper.findComponent({ name: 'TodoModal'})
        expect(todoModal.exists()).toBeFalsy()
    });

    it('should render the todos component', async () => {
        const wrapper = shallowMount(UserProfile)
        const { getTodos } = await import('@/api/Todos')
        const todosComponent = wrapper.findComponent({ name: 'TodosComponent' })
        const componentTime = todosComponent.props('today')
          .getTime().toString().substring(0, 10)
        const today = new Date().getTime().toString().substring(0, 10)

        expect(getTodos).toBeCalled()
        expect(todosComponent.exists()).toBeTruthy()
        expect(todosComponent.props('todos')).toStrictEqual(mockTodos)
        expect(todosComponent.props('selectedTodos')).toBe(SelectedTodos.TODAY)
        expect(componentTime).toBe(today)
    })

    it('should delete a todo', async () => {
        const wrapper = shallowMount(UserProfile)
        const { deleteTodo} = await import('@/api/Todos')
        const todosComponent = wrapper.findComponent({ name: 'TodosComponent' })
       
        todosComponent.trigger('emit-delete', mockTodos[0].userId)

        expect(deleteTodo).toBeCalled()
    })

    it('should edit a todo', async () => {
        const wrapper = shallowMount(UserProfile)
        const { putTodo} = await import('@/api/Todos')
        const todosComponent = wrapper.findComponent({ name: 'TodosComponent' })
       
        todosComponent.trigger('emit-done', mockTodos[0])

        expect(putTodo).toBeCalled()
    })

    it('should render the no todos sentence', async () => {
        const wrapper = shallowMount(UserProfile)
        const todosComponent = wrapper.findComponent({ name: 'TodosComponent' })
        const noTodos = wrapper.find('.profile_no-todos span')

        expect(todosComponent.exists()).toBeFalsy()
        expect(noTodos.exists()).toBeTruthy()
        expect(noTodos.text()).toBe('userProfile.noTodos')
    })

    it('should catch the error when retrieving the todos', async () => {
        getTodos.mockImplementation(() => new Promise((res, rej)  => rej(new Error('Error'))))
        const wrapper = shallowMount(UserProfile)
        const noTodos = wrapper.find('.profile_no-todos span')
        
        expect(noTodos.exists()).toBeTruthy()        
    })
  
});
