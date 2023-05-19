import { describe, expect, it, test } from 'vitest'
import formValidation from '@/services/formValidation'

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

describe('Should handle the format valiudation service', () => {

  it('should validate a username', async () => {
    
    username.value = 'tutu93'
    expect(usernameValidation(username.value)).toBeTruthy()
    expect(usernameError.value).toBeFalsy()
    username.value = '93'
    expect(usernameValidation(username.value)).toBeFalsy()
    expect(usernameError.value).toBeTruthy()
    username.value = '!!!!'
    expect(usernameValidation(username.value)).toBeFalsy()
    expect(usernameError.value).toBeTruthy()
  })

  it('should validate a name', async () => {
    
    name.value = 'toto'
    expect(nameValidation(name.value)).toBeTruthy()
    expect(nameError.value).toBeFalsy()
    name.value = '93'
    expect(nameValidation(name.value)).toBeFalsy()
    expect(nameError.value).toBeTruthy()
    name.value = '!!!!'
    expect(nameValidation(name.value)).toBeFalsy()
    expect(nameError.value).toBeTruthy()
  })

  it('should validate a surname', async () => {
    
    surname.value = 'toto'
    expect(surnameValidation(surname.value)).toBeTruthy()
    expect(surnameError.value).toBeFalsy()
    surname.value = '93'
    expect(surnameValidation(surname.value)).toBeFalsy()
    expect(surnameError.value).toBeTruthy()
    surname.value = '!!!!'
    expect(surnameValidation(surname.value)).toBeFalsy()
    expect(surnameError.value).toBeTruthy()
  })

  it('should validate an email', async () => {
    
    email.value = 'toto@gmail.com'
    expect(emailValidation(email.value)).toBeTruthy()
    expect(emailError.value).toBeFalsy()
    email.value = 'totogmail.com'
    expect(emailValidation(email.value)).toBeFalsy()
    expect(emailError.value).toBeTruthy()
    email.value = 'toto@gmailcom'
    expect(emailValidation(email.value)).toBeFalsy()
    expect(emailError.value).toBeTruthy()
  })

  it('should validate a password', async () => {
    
    password.value = 'Aa!1aaaaaa'
    expect(passwordValidation(password.value)).toBeTruthy()
    expect(passwordError.value).toBeFalsy()
    password.value = 'password'
    expect(passwordValidation(password.value)).toBeFalsy()
    expect(passwordError.value).toBeTruthy()
    password.value = '12345678'
    expect(passwordValidation(password.value)).toBeFalsy()
    expect(passwordError.value).toBeTruthy()
  })

  it('should validate a password match', async () => {
    
    confPassword.value = 'Aa!1aaaaaa'
    password.value = 'Aa!1aaaaaa'
    expect(confPasswordValidation(password.value, confPassword.value)).toBeTruthy()
    expect(confPasswordError.value).toBeFalsy()
    confPassword.value = 'password'
    password.value = 'Aa!1aaaaaa'
    expect(confPasswordValidation(password.value, confPassword.value)).toBeFalsy()
    expect(confPasswordError.value).toBeTruthy()
    confPassword.value = '12345678'
    password.value = 'Aa!1aaaaaa'
    expect(confPasswordValidation(password.value, confPassword.value)).toBeFalsy()
    expect(confPasswordError.value).toBeTruthy()
  })

  it('should reset all values', async () => {
    
    username.value = 'tutu93'
    name.value = 'toto'
    surname.value = 'toto'
    email.value = 'toto@gmail.com'
    password.value = 'Aa!1aaaaaa'
    confPassword.value = 'Aa!1aaaaaa'
    usernameError.value = true
    nameError.value = true
    surnameError.value = true
    emailError.value = true
    emailUsed.value = true
    passwordError.value = true
    confPasswordError.value = true
    successfulSignup.value = true

    resetValues(true)

    expect(username.value).toBe('')
    expect(name.value).toBe('')
    expect(surname.value).toBe('')
    expect(email.value).toBe('')
    expect(password.value).toBe('')
    expect(confPassword.value).toBe('')
    expect(usernameError.value).toBeFalsy()
    expect(nameError.value).toBeFalsy()
    expect(surnameError.value).toBeFalsy()
    expect(emailError.value).toBeFalsy()
    expect(emailUsed.value).toBeFalsy()
    expect(passwordError.value).toBeFalsy()
    expect(confPasswordError.value).toBeFalsy()
    expect(successfulSignup.value).toBeFalsy()
  })

  it('should reset all boolean values', async () => {
    
    username.value = 'tutu93'
    name.value = 'toto'
    surname.value = 'toto'
    email.value = 'toto@gmail.com'
    password.value = 'Aa!1aaaaaa'
    confPassword.value = 'Aa!1aaaaaa'
    usernameError.value = true
    nameError.value = true
    surnameError.value = true
    emailError.value = true
    emailUsed.value = true
    passwordError.value = true
    confPasswordError.value = true
    successfulSignup.value = true

    resetValues(false)

    expect(username.value).toBe('tutu93')
    expect(name.value).toBe('toto')
    expect(surname.value).toBe('toto')
    expect(email.value).toBe('toto@gmail.com')
    expect(password.value).toBe('Aa!1aaaaaa')
    expect(confPassword.value).toBe('Aa!1aaaaaa')
    expect(usernameError.value).toBeFalsy()
    expect(nameError.value).toBeFalsy()
    expect(surnameError.value).toBeFalsy()
    expect(emailError.value).toBeFalsy()
    expect(emailUsed.value).toBeFalsy()
    expect(passwordError.value).toBeFalsy()
    expect(confPasswordError.value).toBeFalsy()
    expect(successfulSignup.value).toBeFalsy()
  })
})