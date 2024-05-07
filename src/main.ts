/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
registerPlugins(app)

app.mount('#app')
