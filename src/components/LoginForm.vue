<template>
    <form @submit.prevent="emitCredentials">
        <section>
            <label>Email</label>
            <input type="text" v-model="email" />
        </section>
        <section>
            <label>Password</label>
            <input type="password" v-model="password" />
        </section>
        <section>
            <input type="submit" value="Login" />
        </section>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const email: Ref<string> = ref("");
const password: Ref<string> = ref("")
const submitEmit = defineEmits(['emit-credentials'])

function emitCredentials(): void {
    if (!email.value || !password.value) {
        console.log(email, password)
    } else {
        submitEmit('emit-credentials', 
          { email: email.value, password: password.value })
    }

}
</script>