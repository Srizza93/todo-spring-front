import { createApp } from 'vue'
import { Pinia, createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { I18n, createI18n } from 'vue-i18n'
import enGB from './locales/en-GB.json'
import frFR from './locales/fr-FR.json'
import itIT from './locales/it-IT.json'
import './assets/base.scss'
import App from './App.vue'
import router from './router/index'

const pinia: Pinia = createPinia()
pinia.use(piniaPluginPersistedState)

type MessageSchema = typeof enGB

const i18n: I18n<{}, {}, {},  string, true> = createI18n<[MessageSchema], 'en-GB' | 'fr-FR' | 'it-IT'>({
    locale: 'en-GB' as string,
    messages: {
        'en-GB': enGB,
        'fr-FR': frFR,
        'it-IT': itIT,
    },
    fallbackLocale: 'en-GB' as string,
    legacy: false as boolean
  })

createApp(App).use(pinia).use(router).use(i18n).mount('#app')
