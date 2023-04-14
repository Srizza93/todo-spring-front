<template>
    <form class="form" @submit.prevent="emitCredentials">
        <section class="form_section">
            <label>Email</label>
            <input class="form_section_input" type="text" v-model="email" />
            <label class="error" :class="{'error-visible': emailError}">Incorrect/Unknown Email</label>
        </section>
        <section class="form_section">
            <label>Password</label>
            <input class="form_section_input" type="password" v-model="password" />
            <label class="error" :class="{'error-visible': passwordError}">Incorrect Password</label>
        </section>
        <section>
            <input class="submit" type="submit" value="Login" />
        </section>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const email: Ref<string> = ref("")
const password: Ref<string> = ref("")
let emailError:  Ref<boolean> = ref(false)
let passwordError: Ref<boolean> = ref(false)
const submitEmit = defineEmits(['emit-credentials'])

function emitCredentials(): void {
    if (!email.value || !password.value) {
        const validEmailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)
        const validPasswordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(email.value)
        if (!email.value || !validEmailFormat) {
            emailError.value = true
        }
        if (!password.value || !validPasswordFormat) {
            passwordError.value = true
        }
        
    } else {
        submitEmit('emit-credentials', 
          { email: email.value, password: password.value })
    }
    resetValues()

}

function resetValues(): void {
    email.value = ''
    password.value = ''
    setTimeout(() => {
        emailError.value = false
        passwordError.value = false
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

.form_section_input {
    padding: $small-all;
    border: 2px solid $fourth-color;
    border-radius: $radius;
    color: $third-color;
    background-color: transparent;
}

.form_section_input:focus {
    outline: none;
}

.submit {
    padding: $small-all;
    border: none;
    border-radius: $radius;
    background-color: $fourth-color;
    font-weight: bold;
    cursor: pointer;
}

.submit:hover {
    background-color: $third-color;
}


.error {
    margin-bottom: 5px;
    opacity: 0;
    color: $fourth-color;
    font-size: 14px;
}

.error-visible {
    opacity: 1;
}
</style>