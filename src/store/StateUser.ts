import { defineStore } from 'pinia'

export const useStateUserStore = defineStore('stateUser', {
    state: () => ({
        token: '' as string,
        userId: '' as string,
        loggedIn: false as boolean,
        language: '' as string
    }),
    actions: {
        updateToken(newToken: string): void {
            this.token = newToken
        }, 
        updateUserId(newId: string): void {
            this.userId = newId
        }, 
        updateLanguage(newLang: string): void {
            this.language = newLang
        },
        setUserStatus(status: boolean): void {
            this.loggedIn = status
        } 
    },
    persist: true
})