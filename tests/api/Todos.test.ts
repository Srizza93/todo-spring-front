import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getTodos, postTodo, putTodo, deleteTodo } from '@/api/Todos'
import { SelectedTodos } from '@/types/TodoType'
import type { Todo } from '@/types/TodoType'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios';
import { useStateUserStore } from '@/store/StateUser'

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

vi.mock('axios', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ data: { _embedded: { todoItemList: mockTodos } } })),
        post: vi.fn(() => Promise.resolve({ status: 200 })),
        put: vi.fn(() => Promise.resolve({ status: 200 })),
        delete: vi.fn(() => Promise.resolve({ status: 200 })),
    },
  }));

describe('Should handle the todos with api call', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

  it('should get the todos', async () => {
    const userStore = useStateUserStore()
    userStore.updateToken('123')

    const todos: Promise<Todo[]> = await getTodos(SelectedTodos.TODAY, '123');

    expect(todos).toStrictEqual(mockTodos);
    expect(axios.get).toHaveBeenCalledWith('/api/todos/TODAY/123', {
        headers: {
            Authorization: 'Bearer 123'
        }
    });
  });

  it('should post a todo', async () => {
    const userStore = useStateUserStore()
    userStore.updateToken('123')

    const response: Promise<Response> = await postTodo(mockTodos[0] as Todo);
    const status = (await response).status

    expect(status).toStrictEqual(200);
    expect(axios.get).toHaveBeenCalledWith('/api/todos/TODAY/123', {
        headers: {
            Authorization: 'Bearer 123'
        }
    });
  });

  it('should put a todo', async () => {
    const userStore = useStateUserStore()
    userStore.updateToken('123')

    const response: Promise<Response> = await putTodo(true as boolean);
    const status = (await response).status

    expect(status).toStrictEqual(200);
    expect(axios.put).toHaveBeenCalledWith('/api/todos', true, {
        headers: {
            Authorization: 'Bearer 123'
        }
    });
  });

  it('should delete a todo', async () => {
    const userStore = useStateUserStore()
    userStore.updateToken('123')

    const response: Promise<Response> = await deleteTodo(mockTodos[0].id as string);
    const status = (await response).status

    expect(status).toStrictEqual(200);
    expect(axios.delete).toHaveBeenCalledWith('/api/todos/1', {
        headers: {
            Authorization: 'Bearer 123'
        }
    });
  });
});
