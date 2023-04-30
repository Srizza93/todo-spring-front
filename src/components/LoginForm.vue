<template>
    <form class="form" @submit.prevent="emitCredentials">
        <section class="form_section">
            <label>Email</label>
            <input class="todo-input" type="text" v-model="email" />
            <label class="error" :class="{'error-visible': emailError}">Incorrect/Unknown Email</label>
        </section>
        <section class="form_section">
            <label>Password</label>
            <input class="todo-input" type="password" v-model="password" />
            <label class="error" :class="{'error-visible': passwordError}">Incorrect Password</label>
        </section>
        <section>
            <input class="todo-button" type="submit" value="Login" />
        </section>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import formValidation from "../services/formValidation"

const {
    emailError,
    passwordError,
    emailValidation,
    passwordValidation,
    resetValues
} = formValidation()

const email: Ref<string> = ref("")
const password: Ref<string> = ref("")
const submitEmit = defineEmits(['emit-credentials'])

function emitCredentials(): void {
    emailValidation(email.value)
    passwordValidation(password.value)
    
    if (!emailError.value && !passwordError.value) {
        submitEmit('emit-credentials', 
        { email: email.value, password: password.value })
    }
    
    setTimeout(() => {
        resetValues(false)
    }, 5000)
}
</script>

<style scoped lang="scss">
.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    padding: $medium-all;
}

.form_section {
    display: flex;
    flex-direction: column;
}
</style>