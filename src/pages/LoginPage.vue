<template>
    <div class="login">
        <div class="login_signup">
            <router-link class="todo-button" to="signup" >Signup</router-link>
        </div>
        <div class="login_main">
            <img class="login_main_logo" src="/check.svg" alt="logo" />
            <LoginForm 
              @emit-credentials="loginValidation" 
              :login-error="loginError" 
              :pending="pending" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { getUser } from '../api/Users'
import type { User } from '../types/UserType'
import LoginForm from '../components/LoginForm.vue'

const usersData: Ref<User | null> = ref(null)
const router: Router = useRouter()
const loginError: Ref<string> = ref('')
const pending: Ref<boolean> = ref(false)

async function loginValidation(credentials: any): Promise<void> {
    pending.value = true
    await getUser(credentials.email, credentials.password).then((user: User) => {
        usersData.value = user
        
        router.push({
            path: `/user/${usersData.value.id}`
        })
    }).catch((err) => {
        loginError.value = err.message

        setTimeout(() => {
            loginError.value = ''
        }, 5000)
    }).finally(() => {
        pending.value = false
    })
}
</script>

<style scoped lang="scss">
.login_signup {
    display: flex;
    justify-content: end;
}
.login_main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login_main_logo {
    width: 100px;
    margin-bottom: 50px;
}

.todo-button {
    margin: $medium-all;
    text-decoration: none;
}
</style>