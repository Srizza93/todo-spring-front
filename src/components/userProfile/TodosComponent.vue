<template>
    <div class="todos">
        <div class="todos_todo" v-for="todo in todos" :key="todo.id">
            <span v-if="todo.due" class="todos_todo_due">Due: {{ formatDate(todo.due) }}</span>
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
            <span class="todos_todo_created">Created: {{ formatDate(todo.created) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { SelectedTodos, Todo } from "../../types/TodoType"
import { formatDate } from "../../services/formatDate"

defineProps<{
  todos: Todo[];
  selectedTodos: SelectedTodos;
}>();

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
    border: 1.5px solid $third-color;
    border-radius: $radius;
    background-color: $fourth-color;
}

.todos_todo_due {
    margin-left: auto;
    font-size: 14px;
}

.todos_todo_middle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: $small-all;
}

.todos_todo_middle_content {
    margin: $medium-all;
}

.todos_todo_middle_content_icons {
    display: flex;
    flex-direction: row;
    align-items: center;
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
</style>