<template>
    <div class="profile">
        <TodoNav
          @emit-select="selectTodoButton"
          :selected-todos="selectedTodos" 
        />
        <div v-if="selectedTodos !== 'DONE'" class="profile_add">
            <img 
              class="profile_add_icon" 
              src="../assets/icons/plus-icon.svg" 
              alt="add todo" 
              @click="openTodoModal"
            />
        </div>
        <TodoModal 
          v-if="todoModal" 
          @emit-closure="closeTodoModal" 
          @emit-submit="submitTodo" 
          :today="today"
        />
        <TodosComponent 
          v-if="todos && !pending" 
          @emit-delete="deleteTodoItem" 
          @emit-done="submitDone" 
          :todos="todos" 
          :selectedTodos="selectedTodos"
          :today="today"
        />
        <div class="profile_custom-loader" v-else-if="pending">
            <CustomLoader />
        </div>
        <div v-else class="profile_no-todos">
            <span>{{ t('userProfile.noTodos') }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue"
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateUserStore } from '../store/StateUser'
import { Todo, SelectedTodos } from "../types/TodoType"
import { getTodos, postTodo, putTodo, deleteTodo } from '../api/Todos'
import TodoNav from "../components/userProfile/TodoNav.vue"
import TodoModal from "../components/userProfile/TodoModal.vue"
import TodosComponent from "../components/userProfile/TodosComponent.vue"

const CustomLoader = defineAsyncComponent(() => import("../components/CustomLoader.vue"))

const { t } = useI18n()
const store = useStateUserStore()
const userId = store.userId
const todos: Ref<Todo[]> = ref([])
const selectedTodos: Ref<SelectedTodos> = ref(SelectedTodos.TODAY)
const todoModal: Ref<boolean> = ref(false)
const pending: Ref<boolean> = ref(false)
const today: Date = new Date()

async function retrieveTodos(): Promise<void> {
    pending.value = true
    
    await getTodos(selectedTodos.value, userId)
      .then((response) => {
        todos.value = response
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        pending.value = false
      })
}

function openTodoModal(): void {
    todoModal.value = true
}

function closeTodoModal(): void {
    todoModal.value = false
}

function selectTodoButton(todoType: SelectedTodos): void {
    selectedTodos.value = todoType
}

async function submitTodo(todo: { dueDate: Date, content: string }): Promise<void> {
    todoModal.value = false
    const newTodo: Todo = {
        userId: userId,
        content: todo.content,
        due: todo.dueDate,
        created: today,
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
    transition-duration: 2s;
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

.profile_custom-loader {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.profile_no-todos {
    display: flex;
    justify-content: center;
    color: $third-color;
}
</style>