import type { UserModule } from './types/app'
import App from './App.vue'
import { createApp } from 'vue'
import { router, routes } from './router'
import './styles/index.scss'

const app = createApp(App)
app.use(router)

// Auto-import from /src/plugins
Object.values(
  import.meta.glob<{ install: UserModule }>('./plugins/*.ts', { eager: true }),
).forEach((i) => i.install?.({ app, router, routes }))

app.mount('#app')
