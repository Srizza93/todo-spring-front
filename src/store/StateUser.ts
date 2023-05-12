import { defineStore } from 'pinia'

export const useStateUserStore = defineStore('stateUser', {
    state: () => ({
        token: '' as string,
        userId: '' as string,
        loggedIn: false as boolean
    }),
    actions: {
        updateToken(newToken: string): void {
            this.token = newToken
        }, 
        updateUserId(newId: string): void {
            this.userId = newId
        }, 
        setUserStatus(status: boolean): void {
            this.loggedIn = status
        } 
    },
    persist: true
})