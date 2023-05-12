import { ref } from "vue"
import type { Ref } from "vue"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
const usernameRegex = /^[a-zA-Z0-9]{3,30}$/
const nameRegex = /^[a-zA-Z]{1,30}( [a-zA-Z]{1,30}){0,3}$/

export default function() {
    const username: Ref<string> = ref('')
    const name: Ref<string> = ref('')
    const surname: Ref<string> = ref('')
    const email: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const confPassword: Ref<string> = ref('')
    const usernameError: Ref<boolean> = ref(false)
    const nameError: Ref<boolean> = ref(false)
    const surnameError: Ref<boolean> = ref(false)
    const emailError: Ref<boolean> = ref(false)
    const emailUsed: Ref<boolean> = ref(false)
    const passwordError: Ref<boolean> = ref(false)
    const confPasswordError: Ref<boolean> = ref(false)
    const successfulSignup: Ref<boolean> = ref(false)

    function usernameValidation(username: string): boolean {
        if (!username || !usernameRegex.test(username)) {
            usernameError.value = true
            return false
        }
        return true
    }

    function nameValidation(name: string): boolean {
        if (!name || !nameRegex.test(name)) {
            nameError.value = true
            return false
        }
        return true
    }

    function surnameValidation(surname: string): boolean {
        if (!surname || !nameRegex.test(surname)) {
            surnameError.value = true
            return false
        }
        return true
    }
    
    function emailValidation(email: string): boolean {
        if (!email || !emailRegex.test(email)) {
            emailError.value = true
            return false
        }
        return true
    }
    
    function passwordValidation(password: string): boolean {
        if (!password || !passwordRegex.test(password)) {
            passwordError.value = true
            return false
        }
        return true
    }
    
    function confPasswordValidation(password: string, confPassword: string): boolean {
        if (!confPassword || password !== confPassword) {
            confPasswordError.value = true
            return false
        }
        return true
    }

    function resetValues(allValues: boolean): void {
        if (allValues) {
            username.value = ''
            name.value = ''
            surname.value = ''
            email.value = ''
            password.value = ''
            confPassword.value = ''
        }
        usernameError.value = false
        nameError.value = false
        surnameError.value = false
        emailError.value = false
        emailUsed.value = false
        passwordError.value = false
        confPasswordError.value = false
        successfulSignup.value = false
    }

    return {
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
    }
}
