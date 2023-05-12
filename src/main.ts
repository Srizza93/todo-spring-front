import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import './assets/base.scss'
import App from './App.vue'
import router from './router/index'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

createApp(App).use(pinia).use(router).mount('#app')
