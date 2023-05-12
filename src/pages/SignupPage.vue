<template>
    <div class="signup">
        <form class="signup_form" @submit.prevent="submitForm">
            <section class="signup_form_section success" :class="{ 'success-visible': successfulSignup}">
                <span>Signup successful!</span>
                <span>We have sent an email to</span>
                <span class="success_email">{{ email }}</span>
            </section>
            <section class="signup_form_section">
                <label>Username</label>
                <input class="todo-input" type="text" v-model="username" />
                <label class="error" :class="{ 'error-visible': usernameError }">Username is not valid</label>
            </section>
            <section class="signup_form_section">
                <label>Name</label>
                <input class="todo-input" type="text" v-model="name" />
                <label class="error" :class="{ 'error-visible': nameError }">Name is not valid</label>
            </section>
            <section class="signup_form_section">
                <label>Surname</label>
                <input class="todo-input" type="text" v-model="surname" />
                <label class="error" :class="{ 'error-visible': surnameError }">Surname is not valid</label>
            </section>
            <section class="signup_form_section">
                <label>Email</label>
                <input class="todo-input" type="email" v-model="email" />
                <label v-if="emailError" class="error" :class="{ 'error-visible': emailError }">Email is not valid</label>
                <label v-else class="error" :class="{ 'error-visible': emailUsed }">Email has been used already</label>
            </section>
            <section class="signup_form_section">
                <label>Password</label>
                <input class="todo-input" type="password" v-model="password" />
                <label class="error" :class="{ 'error-visible': passwordError }">Password is not valid</label>
            </section>
            <section class="signup_form_section">
                <label>Confirm Password</label>
                <input class="todo-input" type="password" v-model="confPassword" />
                <label class="error" :class="{ 'error-visible': confPasswordError }">Password is not matching</label>
            </section>
            <section class="signup_form_section-signup">
                <input
                  v-if="!pending"
                  class="todo-button signup_form_section_signup" 
                  type="submit" 
                  value="Signup" 
                />
                <CustomLoader v-else />
            </section>
            <section class="login-section">
                <span>Already have an account? <RouterLink class="todo-link" to="/">Login</RouterLink></span>   
            </section>
        </form>
    </div>
</template>

<script setup lang="ts">
import formValidation from "../services/formValidation"
import { signupUser } from "../api/Users"
import { User } from "../types/UserType";
import { defineAsyncComponent, ref } from "vue";
import type { Ref } from "vue";

const CustomLoader = defineAsyncComponent(() => import("../components/CustomLoader.vue"))

const {
    username,
    name,
    surname,
    email,
    password,
    confPassword,
    usernameError,
    nameError,
    surnameError,
    emailError,
    emailUsed,
    passwordError,
    confPasswordError,
    successfulSignup,
    usernameValidation,
    nameValidation,
    surnameValidation,
    emailValidation,
    passwordValidation,
    confPasswordValidation,
    resetValues
} = formValidation()

const pending: Ref<boolean> = ref(false)

async function submitForm(): Promise<void> {

    const usernameValid: Ref<boolean> = ref(usernameValidation(username.value))
    const nameValid: Ref<boolean> = ref(nameValidation(name.value))
    const surnameValid: Ref<boolean> = ref(surnameValidation(surname.value))
    const emailValid: Ref<boolean> = ref(emailValidation(email.value))
    const passwordValid: Ref<boolean> = ref(passwordValidation(password.value))
    const confPasswordValid: Ref<boolean> = ref(confPasswordValidation(password.value, confPassword.value))

    if (usernameValid.value && nameValid.value && surnameValid.value && emailValid.value 
      && passwordValid.value && confPasswordValid.value) {
        try {
            pending.value = true
            const newUser: User = {
                username: username.value,
                name: name.value,
                surname: surname.value,
                email: email.value,
                password: password.value
            }
            await signupUser(newUser)
            successfulSignup.value = true;
        } catch(error: any) {
            if (error.message === "This username has been used already") {
                usernameError.value = true
            }
            if (error.message === "The name format is not valid") {
                nameError.value = true
            }
            if (error.message === "The surname format is not valid") {
                surnameError.value = true
            }
            if (error.message === "The email format is not valid") {
                emailError.value = true
            }
            if (error.message === "This email has been used already") {
                emailUsed.value = true
            }
            if (error.message === "The password format is not valid") {
                passwordError.value = true
            }
        } finally {
            setTimeout(() => {
                resetValues(true)
            }, 5000)
            pending.value = false
        }
    } else {
        setTimeout(() => {
            resetValues(false)
        }, 5000)
    }

}
</script>

<style scoped lang="scss">
.signup {
    display: flex;
    justify-content: center;
}

.signup_form {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 300px;
    padding: 25px 50px;
    background-color: $fourth-color;
}

.success {
    opacity: 0;
    align-items: center;
    height: 55px;
    margin: 15px 0;
    font-size: 14px;
    text-align: center;
    transition-duration: 1.5s;
}

.success-visible {
    opacity: 1;
}

.success_email {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.signup_form_section {
    display: flex;
    flex-direction: column;
    color: $primary-color;
}

.signup_form_section-signup {
    display: flex;
    justify-content: center;
    height: 50px;
}

.signup_form_section_signup {
    width: 100%;
    height: min-content;
}

.todo-input {
    border: 2px solid $primary-color;
    color: $primary-color;
}

.todo-button {
    color: $fourth-color;
    background-color: $primary-color;
}

.todo-button:hover {
    background-color: $third-color;
    color: $primary-color;
}

.error {
    color: $third-color;
    transition: 1.5s;
}

.login-section {
    margin-top: 35px;
    font-size: 14px;
}
</style>