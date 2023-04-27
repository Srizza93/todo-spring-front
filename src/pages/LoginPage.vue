<template>
    <div class="login">
        <div class="login_signup">
            <router-link class="todo-button" to="signup" >Signup</router-link>
        </div>
        <div class="login_main">
            <img class="login_main_logo" src="/check.svg" alt="logo" />
            <span class="error" :class="{'error-visible': loginError}">Login Failed</span>
            <LoginForm @emit-credentials="loginValidation" />
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
let loginError: Ref<boolean> = ref(false)

async function loginValidation(credentials: any): Promise<void> {
    await getUser(credentials.email, credentials.password).then((user: User) => {
        usersData.value = user
    })

    console.log(usersData.value)

    if (usersData.value) {
        router.push({
            path: `/user/${usersData.value.id}`
        })
    } else {
        loginError.value = true
        setTimeout(() => {
            loginError.value = false
        }, 5000)
    }
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

.error {
    margin-bottom: 50px;
    opacity: 0;
    color: $fourth-color;
}

.error-visible {
    opacity: 1;
}
</style>