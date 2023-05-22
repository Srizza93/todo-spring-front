<template>
    <div class="settings">
        <div></div>
            <div class="settings_buttons">
                <button 
                    v-for="todoButton in todoButtons" 
                    :key="todoButton.id" 
                    class="todo-button"
                    data-test-id="typeButton"
                    :class="{ selected: selectedTodos === todoButton.type}"
                    @click="emitSelect(todoButton.type)"
                    >
                    {{ $t(`userProfile.${todoButton.text}`) }}
                </button>
            </div>
        <div class="settings_logout">
            <RouterLink 
              class="todo-button settings_logout_button selected" 
              @click="logOut"
              to="/"
            >
                {{ $t('processes.logout') }}
            </RouterLink>
        </div>
        </div>
</template>

<script lang="ts" setup>
import type { Ref } from "vue"
import { ref } from "vue"
import { useStateUserStore } from '../../store/StateUser'
import type { TodoIndex } from "../../types/TodoType"
import { SelectedTodos } from "../../types/TodoType"

defineProps<{
  selectedTodos: SelectedTodos;
}>();

const todoButtons: Ref<TodoIndex[]> = ref([
    {
        id: 1,
        text: 'today',
        type: SelectedTodos.TODAY,
    },
    {
        id: 2,
        text: 'inbox',
        type: SelectedTodos.INBOX,
    },
    {
        id: 3,
        text: 'done',
        type: SelectedTodos.DONE,
    },
])

const submitEmit = defineEmits(['emit-select'])

function emitSelect(selected: SelectedTodos): void {
    submitEmit('emit-select', selected)
}

function logOut(): void {
    const store = useStateUserStore()
    store.setUserStatus(false)
    store.updateToken('')
    store.updateUserId('')
}
</script>

<style lang="scss" scoped>
.settings {
    display: grid;
    grid-template-columns: 25% 50% 25%;
    margin-bottom: 50px;
}

.settings_buttons {
    display: grid;
    grid-template-columns: 33% 33% 33%;
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

@media screen and (max-width: 600px) {
    
    .settings {
        display: flex;
        flex-direction: column-reverse;
    }

    .settings_logout_button {
        margin-bottom: 25px;
    }
}
</style>