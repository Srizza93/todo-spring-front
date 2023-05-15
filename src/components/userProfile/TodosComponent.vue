<template>
    <div class="todos">
        <div class="todos_todo" v-for="todo in todos" :key="todo.id" :class="{ 'todo-expired': isTodoExpired(todo)}">
            <span v-if="todo.due" class="todos_todo_due">
                <b v-if="!isTodoExpired(todo)">{{ t('userProfile.due') }}:</b>
                <b v-else>{{ t('userProfile.expired') }}:</b>
                 {{ formatDate(todo.due) }}
            </span>
            <div class="todos_todo_middle">
                <p class="todos_todo_middle_content">{{ todo.content }}</p>
                <div class="todos_todo_middle_content_icons">
                    <img
                      v-if="selectedTodos !== 'DONE'"
                      class="todos_todo_middle_content_icons_check"
                      src="../../assets/icons/check-icon.svg" 
                      alt="check"
                      @click="emitDone(todo, true)"
                    />
                    <img
                      v-else
                      class="todos_todo_middle_content_icons_retrieve"
                      src="../../assets/icons/retrieve-icon.png"
                      alt="retrieve"
                      @click="emitDone(todo, false)"
                    />
                    <img 
                      class="todos_todo_middle_content_icons_trash"
                      src="../../assets/icons/trash-icon.png" 
                      alt="trash" 
                      @click="emitDelete(todo.id)" 
                    />
                </div>
            </div>
            <span class="todos_todo_created"><b>{{ t('userProfile.created') }}:</b> {{ formatDate(todo.created) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { SelectedTodos, Todo } from "../../types/TodoType"
import { formatDate } from "../../services/formatDate"

const props = defineProps<{
  todos: Todo[];
  selectedTodos: SelectedTodos;
  today: Date;
}>();

const { t } = useI18n()
const submitEmit = defineEmits(['emit-delete', 'emit-done'])


function emitDelete(id: number | undefined): void {
    if (id) {
        submitEmit('emit-delete', id)
    }
}

function emitDone(todo: Todo, done: boolean): void {
    todo.done = done
    submitEmit('emit-done', todo)
}

function isTodoExpired(todo: Todo): boolean {
    if (todo.due && props.selectedTodos !== 'DONE') {
        const dueTime: number = new Date(formatDate(todo.due)).getTime()
        const formatToday: number = new Date(formatDate(props.today)).getTime()
        if(dueTime < formatToday) {
            return true
        }
    } 
    return false
}
</script>

<style lang="scss" scoped>
.todos {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.todos_todo {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 800px;
    padding: $medium-all;
    margin: $small-all;
    border: 3px solid $third-color;
    border-radius: $radius;
    background-color: $fourth-color;
}

.todo-expired {
    background-color: $third-color;
    border: 3px solid $fourth-color;

}

.todos_todo_due {
    margin-left: auto;
    font-size: 14px;
}

.todos_todo_middle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.todos_todo_middle_content {
    padding: $medium-all;
    border-radius: $radius;
    width: 100%;
    margin: 15px 15px 15px 0;
    background-color: $third-color-opacity;
}

.todo-expired 
 .todos_todo_middle 
  .todos_todo_middle_content {
    background-color: $fourth-color-opacity;
  }

.todos_todo_middle_content_icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
}

.todos_todo_middle_content_icons_trash,
 .todos_todo_middle_content_icons_check {
    width: 50px;
    height: 50px;
    cursor: pointer;
}

.todos_todo_middle_content_icons_retrieve {
    width: 40px;
    height: 40px;
    cursor: pointer;
} 

.todos_todo_middle_content_icons_trash:hover,
  .todos_todo_middle_content_icons_check:hover,
  .todos_todo_middle_content_icons_retrieve:hover {
    opacity: .7;
}

.todos_todo_created {
    font-size: 14px;
}

@media screen and (max-width: 510px) {
    
    .todos_todo_middle {
    flex-direction: column;
}

}
</style>