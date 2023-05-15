import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import frFR from './locales/fr-FR.json'
import enGB from './locales/en-GB.json'
import './assets/base.scss'
import App from './App.vue'
import router from './router/index'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

type MessageSchema = typeof enGB

const i18n = createI18n<[MessageSchema], 'en-GB' | 'fr-FR'>({
    locale: 'en-GB',
    messages: {
        'en-GB': enGB,
        'fr-FR': frFR,
    },
    legacy: false
  })

createApp(App).use(pinia).use(router).use(i18n).mount('#app')
