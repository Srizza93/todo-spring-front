import { defineStore } from 'pinia'

export const useStateUserStore = defineStore('stateUser', {
    state: () => ({
        token: '' as string,
        loggedIn: false as boolean
    }),
    actions: {
        updateToken(newToken: string): void {
            this.token = newToken
        }, 
        setUserStatus(status: boolean): void {
            this.loggedIn = status
        } 
    },
    persist: true
})