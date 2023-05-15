<template>
    <form class="form" @submit.prevent="emitCredentials">
        <section class="form_section">
            <label>{{ t('forms.username') }}</label>
            <input class="todo-input" type="text" v-model="username" />
            <label 
              class="error" 
              :class="{'error-visible': loginError === 'Invalid username' || usernameError}"
            >
            {{ t('forms.error') }} {{ t('forms.username') }}
            </label>
        </section>
        <section class="form_section">
            <label>{{ t('forms.password') }}</label>
            <input class="todo-input" type="password" v-model="password" />
            <label 
              class="error" 
              :class="{'error-visible': loginError === 'Invalid password' || passwordError}"
            >
            {{ t('forms.error') }} {{ t('forms.password') }}
            </label>
        </section>
        <section class="form_section form_section-login" >
            <input 
              v-if="!pending"
              class="todo-button form_section-login_login" 
              type="submit" 
              :value="t('processes.login')" 
            />
            <CustomLoader v-else />
        </section>
    </form>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import formValidation from '../services/formValidation'

const CustomLoader = defineAsyncComponent(() => import("./CustomLoader.vue"))

const { t } = useI18n() 
const {
    usernameError,
    passwordError,
    usernameValidation,
    passwordValidation,
    resetValues
} = formValidation()

defineProps<{
  loginError: string
  pending: boolean
}>();

const username: Ref<string> = ref("")
const password: Ref<string> = ref("")
const submitEmit = defineEmits(['emit-credentials'])

function emitCredentials(): void {
  usernameValidation(username.value)
    passwordValidation(password.value)
    
    if (!usernameError.value && !passwordError.value) {
        submitEmit('emit-credentials', 
        { username: username.value, password: password.value })
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
    align-items: center;
    width: fit-content;
    padding: $medium-all;
}

.form_section {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
}

.form_section-login {
    display: flex;
    align-items: center;
}

.form_section-login, 
  .form_section-login_login {
    width: 100%;
}

.error {
    position: absolute;
    left: 0;
    bottom: -22px;
} 
</style>