<template>
    <div class="login">
        <img class="login_logo" src="/check.svg" alt="logo" />
        <span class="error" :class="{'error-visible': loginError}">Login Failed</span>
        <LoginForm @emit-credentials="loginValidation" />
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
.login {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

.login_logo {
    width: 100px;
    margin: 50px 0 50px 0;
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