<template>
    <div class="settings">
        <div></div>
            <div class="settings_buttons">
                <button 
                    v-for="todoButton in todoButtons" 
                    :key="todoButton.id" 
                    class="todo-button" 
                    :class="{ selected: selectedTodos === todoButton.type}"
                    @click="emitSelect(todoButton.type)"
                    >
                    {{ todoButton.text }}
                </button>
            </div>
        <div class="settings_logout">
            <RouterLink class="todo-button selected" to="/">
                Logout
            </RouterLink>
        </div>
        </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue"
import { ref } from "vue"
import type { TodoIndex } from "../../types/TodoType"
import { SelectedTodos } from "../../types/TodoType"

defineProps<{
  selectedTodos: SelectedTodos;
}>();

const todoButtons: Ref<TodoIndex[]> = ref([
    {
        id: 1,
        text: 'Today',
        type: SelectedTodos.TODAY,
    },
    {
        id: 2,
        text: 'Inbox',
        type: SelectedTodos.INBOX,
    },
    {
        id: 3,
        text: 'Done',
        type: SelectedTodos.DONE,
    },
])

const submitEmit = defineEmits(['emit-select'])

function emitSelect(selected: SelectedTodos): void {
    submitEmit('emit-select', selected)
}
</script>

<style lang="scss" scoped>
.settings {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
}

.settings_buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.settings_logout {
    display: flex;
    justify-content: end;
}

.todo-button {
    opacity: .7;
    margin: 0 15px;
    text-decoration: none;
}

.selected {
    opacity: 1;
}
</style>