<template>
    <div class="login">
        <div class="login_signup">
            <router-link class="todo-button" to="signup" >{{ $t('processes.signup') }}</router-link>
        </div>
        <div class="login_main">
            <img class="login_main_logo" src="/check.svg" alt="logo" />
            <LoginForm 
              @emit-credentials.native="loginValidation" 
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
import { useStateUserStore } from '../store/StateUser'
import { getUser } from '../api/Users'
import type { User, Credentials } from '../types/UserType'
import LoginForm from '../components/LoginForm.vue'

const store = useStateUserStore()
const usersData: Ref<User | null> = ref(null)
const router: Router = useRouter()
const loginError: Ref<string> = ref('')
const pending: Ref<boolean> = ref(false)

async function loginValidation(credentials: Credentials): Promise<void> {
    pending.value = true
    
    await getUser(credentials.username, credentials.password).then((user: User) => {
        usersData.value = user
        const token: string | undefined = usersData.value.accessToken
        const userId: string | undefined = usersData.value.id
        
        if (token && userId) {
            store.updateToken(token)
            store.updateUserId(userId)
            store.setUserStatus(true)
        }
        
        router.push({
            path: `/user`
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