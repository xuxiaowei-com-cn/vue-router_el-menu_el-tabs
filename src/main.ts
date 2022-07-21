import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
// @ts-ignore
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPluginPersist)

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
