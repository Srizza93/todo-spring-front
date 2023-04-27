import { ref } from "vue"
import type { Ref } from "vue"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const nameRegex = /^[a-zA-Z]{1,30}$/

export default function() {
    const name: Ref<string> = ref('')
    const surname: Ref<string> = ref('')
    const email: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const confPassword: Ref<string> = ref('')
    const nameError: Ref<boolean> = ref(false)
    const surnameError: Ref<boolean> = ref(false)
    const emailError: Ref<boolean> = ref(false)
    const emailUsed: Ref<boolean> = ref(false)
    const passwordError: Ref<boolean> = ref(false)
    const confPasswordError: Ref<boolean> = ref(false)
    const successfulSignup: Ref<boolean> = ref(false)

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
            name.value = ''
            surname.value = ''
            email.value = ''
            password.value = ''
            confPassword.value = ''
        }
        nameError.value = false
        surnameError.value = false
        emailError.value = false
        emailUsed.value = false
        passwordError.value = false
        confPasswordError.value = false
        successfulSignup.value = false
    }

    return {
        name,
        surname,
        email,
        password,
        confPassword,
        nameError,
        surnameError,
        emailError,
        emailUsed,
        passwordError,
        confPasswordError,
        successfulSignup,
        nameValidation,
        surnameValidation,
        emailValidation,
        passwordValidation,
        confPasswordValidation,
        resetValues
    }
}
