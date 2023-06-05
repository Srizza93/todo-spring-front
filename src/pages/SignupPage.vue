<template>
    <div class="signup">
        <form class="signup_form" @submit.prevent="submitForm">
            <section class="signup_form_section success" :class="{ 'success-visible': successfulSignup}">
                <span>{{ $t('forms.success.line1') }}</span>
                <span>{{ $t('forms.success.line2') }}</span>
                <span class="success_email">{{ email }}</span>
            </section>
            <section class="signup_form_section">
                <label>{{ $t('forms.username') }}</label>
                <input 
                  class="todo-input" 
                  type="text" 
                  v-model="username"
                  data-test-id="username"
                />
                <label 
                  class="error" 
                  :class="{ 'error-visible': usernameError }"
                  data-test-id="usernameError"
                >
                  {{ $t('forms.username') }} {{ $t('forms.error') }}
                </label>
            </section>
            <section class="signup_form_section">
                <label>{{ $t('forms.name') }}</label>
                <input 
                  class="todo-input" 
                  type="text" 
                  v-model="name"
                  data-test-id="name"
                />
                <label 
                  class="error" 
                  :class="{ 'error-visible': nameError }"
                  data-test-id="nameError"
                >
                  {{ $t('forms.name') }} {{ $t('forms.error') }}
                </label>
            </section>
            <section class="signup_form_section">
                <label>{{ $t('forms.surname') }}</label>
                <input 
                  class="todo-input" 
                  type="text" 
                  v-model="surname"
                  data-test-id="surname"
                />
                <label 
                  class="error" 
                  :class="{ 'error-visible': surnameError }"
                  data-test-id="surnameError"
                >
                  {{ $t('forms.surname') }} {{ $t('forms.error') }}
                </label>
            </section>
            <section class="signup_form_section">
                <label>{{ $t('forms.email') }}</label>
                <input 
                  class="todo-input"
                  type="email"
                  v-model="email"
                  data-test-id="email"
                />
                <label 
                  v-if="emailError" 
                  class="error" 
                  :class="{ 'error-visible': emailError }"
                  data-test-id="emailError"
                >
                  {{ $t('forms.email') }} {{ $t('forms.error') }}
                </label>
                <label 
                  v-else 
                  class="error" 
                  :class="{ 'error-visible': emailUsed }"
                  data-test-id="emailUsed"
                >
                  {{ $t('forms.email') }} {{ $t('forms.hasBeenUsed') }}
                </label>
            </section>
            <section class="signup_form_section">
                <label>{{ $t('forms.password') }}</label>
                <input 
                  class="todo-input"
                  type="password"
                  v-model="password"
                  data-test-id="password"
                />
                <label 
                  class="error" 
                  :class="{ 'error-visible': passwordError }"
                  data-test-id="passwordError"
                >
                  {{ $t('forms.password') }} {{ $t('forms.error') }}
                </label>
            </section>
            <section class="signup_form_section">
                <label>{{ $t('forms.confirmPassword') }}</label>
                <input 
                  class="todo-input" 
                  type="password" 
                  v-model="confPassword"
                  data-test-id="confPassword"
                />
                <label 
                  class="error" 
                  :class="{ 'error-visible': confPasswordError }"
                  data-test-id="confPasswordError"
                >
                  {{ $t('forms.confPasswordError') }}
                </label>
            </section>
            <section class="signup_form_section-signup">
                <input
                  v-if="!pending"
                  class="todo-button signup_form_section_signup" 
                  type="submit" 
                  :value="$t('processes.signup')" 
                />
                <CustomLoader v-else />
            </section>
            <section class="login-section">
                <span>{{ $t('signupPage.haveAnAccount') }} <RouterLink class="todo-link" to="/">{{ $t('processes.login') }}</RouterLink></span>   
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

            setTimeout(() => {
                resetValues(true)
            }, 5000)
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
            setTimeout(() => {
                resetValues(false)
            }, 5000)
        } finally {
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
}

.login-section {
    margin-top: 35px;
    font-size: 14px;
}
</style>