<template>
    <div>
        <div>
            <LoginForm @emit-credentials="loginValidation" />
            <span v-for="(user, index) in usersData">Index: {{ index }} - {{ user }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue'; 
import { getUser } from '../api/Users';
import type { User, UserProfileList } from '../types/UserType'
import LoginForm from '../components/LoginForm.vue'

const usersData: Ref<User[]> = ref([]);

function loginValidation(credentials: any): void {
    getUser(credentials.email).then((user: any) => {
        usersData.value = user
    })
      .catch(console.error);
}
</script>

<style scoped>
</style>