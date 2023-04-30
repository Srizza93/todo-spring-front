<template>
    <div class="profile">
        <div class="profile_settings">
            <button 
              v-for="todoButton in todoButtons" 
              :key="todoButton.id" 
              class="todo-button" 
              :class="{ selected: selectedTodos === todoButton.type}"
              @click="selectTodoButton(todoButton.type)"
            >
              {{ todoButton.text }}
            </button>
        </div>
        <div v-if="selectedTodos !== 'DONE'" class="profile_add">
            <img 
              class="profile_add_icon" 
              src="../assets/icons/plus-icon.svg" 
              alt="add todo" 
              @click="openTodoModal"
            />
        </div>
        <TodoModal v-if="todoModal" @emit-closure="closeTodoModal" @emit-submit="submitTodo" />
        <TodosComponent 
          v-if="todos" 
          @emit-delete="deleteTodoItem" 
          @emit-done="submitDone" 
          :todos="todos" 
          :selectedTodos="selectedTodos"
        />
        <div v-else class="profile_no-todos">
            <span>There are no todos here</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue"
import { onMounted, ref, watch } from "vue"
import { Todo, SelectedTodos, TodoIndex } from "../types/TodoType"
import { getTodos, postTodo, putTodo, deleteTodo } from "../api/Todos"
import type { RouteLocationNormalizedLoaded } from "vue-router"
import { useRoute } from "vue-router"
import TodoModal from "../components/userProfile/TodoModal.vue"
import TodosComponent from "../components/userProfile/TodosComponent.vue"

const route: RouteLocationNormalizedLoaded = useRoute();
const todoButtons: Ref<TodoIndex[]> = ref([
    {
        id: 1,
        text: 'Today',
        type: SelectedTodos.TODAY,
        selected: true
    },
    {
        id: 2,
        text: 'Inbox',
        type: SelectedTodos.INBOX,
        selected: false
    },
    {
        id: 3,
        text: 'Done',
        type: SelectedTodos.DONE,
        selected: false
    },
])
const todos: Ref<Todo[]> = ref([])
const selectedTodos: Ref<SelectedTodos> = ref(SelectedTodos.TODAY)
const todoModal: Ref<boolean> = ref(false)

async function retrieveTodos(): Promise<void> {
    todos.value = await getTodos(selectedTodos.value, route.params.id.toString())
    console.log(todos.value)
}

function selectTodoButton(todoType: SelectedTodos): void {
    selectedTodos.value = todoType
}

function openTodoModal(): void {
    todoModal.value = true
}

function closeTodoModal(): void {
    todoModal.value = false
}

async function submitTodo(todo: { dueDate: string, content: string, today: string }): Promise<void> {
    todoModal.value = false
    const newTodo: Todo = {
        userId: route.params.id.toString(),
        content: todo.content,
        due: todo.dueDate,
        created: todo.today,
        done: false
    }
    await postTodo(newTodo)
    retrieveTodos()
}

async function deleteTodoItem(todoId: number) {
    await deleteTodo(todoId)
    retrieveTodos()
}

async function submitDone(todo: Todo) {
    await putTodo(todo)
    retrieveTodos()
}

onMounted(() => {
    retrieveTodos()
})

watch(() => selectedTodos.value, () => {
    retrieveTodos()
})
</script>

<style lang="scss" scoped>
.profile {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 15px 0;
    color: $primary-color;
}

.todo-button {
    opacity: .7;
    margin: 0 15px;
}

.profile_settings {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 50px;
}

.profile_add {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}

.profile_add_icon {
    width: 50px;
    height: 50px;
    cursor: pointer;
}

.profile_add_icon:hover {
    opacity: .7;
}

.profile_no-todos {
    display: flex;
    justify-content: center;
    color: $third-color;
}

.selected {
    opacity: 1;
}
</style>