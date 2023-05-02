<template>
    <form class="modal" @submit.prevent="emitSubmit">
        <button class="modal_close-button" @click="emitClosure">
            <span aria-hidden="true">&times;</span>
        </button>
        <div class="modal_calendar">
            <div class="modal_calendar_container">
                <input 
                  class="modal_calendar_container_input"
                  v-model="dueDate"
                  type="date" 
                  :min="formatDate(today)"
                />
            </div>
            <span>{{ dueDate }}</span>
        </div>
        <textarea 
          class="modal_text-box"
          v-model="content"
          maxlength="100"
          rows="4"
          placeholder="Write a todo..."
          autofocus
          contenteditable
          @keyup.enter="emitSubmit"
        ></textarea>
        <input class="todo-button" type="submit" value="Add" />
    </form>
</template>

<script lang="ts" setup>
import type { Ref } from "vue"
import { ref } from "vue"

const submitEmit = defineEmits(['emit-closure', 'emit-submit'])
const dueDate: Ref<Date | null> = ref(null)
const content: Ref<string> = ref("")
const today: Date = new Date()
  

function emitClosure(): void {
    submitEmit('emit-closure')
}

function emitSubmit(): void {
    submitEmit('emit-submit', { dueDate: dueDate.value, content: content.value, today })
    dueDate.value = null
    content.value = ''
}

function formatDate(date: Date): string {
    const day: string = date.getDate() + ''
    const month: string = date.getMonth() + 1 + ''
    return `${date.getFullYear()}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

</script>

<style lang="scss" scoped>
.modal {
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 25%;
    right: 25%;
    top: 75px;
    padding-bottom: 32.5px;
    border: 1px solid $third-color;
    border-radius: $radius;
    background-color: $third-color;
    z-index: 9;
}

.modal_close-button {
    margin: 5px 5px 5px auto;
    width: 22.5px;
    height: 22.5px;
    border: none;
    border-radius: 50%;
    background-color: $primary-color;
    color: $fourth-color;
    font-size: 18px;
    font-weight: bold;
    transition: 1s;
    cursor: pointer;
}

.modal_close-button:hover {
    transform: rotate(90deg);
}

.modal_calendar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
}
.modal_calendar_container {
    background-image: url('../../assets/icons/calendar-icon.png');
    background-repeat: no-repeat;
    width: 50px;
    height: 50px;
}

.modal_calendar_container:hover {
    opacity: .7;
}

.modal_calendar_container_input {
  position: relative;
  width: 50px;
  height: 50px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  color: transparent;
  background-color: transparent;
  cursor: pointer;
}

.modal_calendar_container_input:focus {
  outline: none;
}

.modal_calendar_container_input::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 64px;
}

.modal_text-box {
    padding: $medium-all;
    border-radius: $radius;
    border: none;
    background-color: $fourth-color;
    font-family: inherit;
    resize: none;
} 

.modal_text-box:focus {
    outline: none;
}

.todo-button {
    width: 30%;
    margin: 5px auto 0 auto;
    background-color: $primary-color;
    color: $fourth-color;
    font-size: 14px;
    transition-duration: 1s;
}

.todo-button:hover {
    width: 35%;
    background-color: $primary-color-opacity;
}
</style>