import { createPinia } from 'pinia'
import { UserModule } from '~/types/app'
import cloneDeep from 'lodash-es/cloneDeep'

export const install: UserModule = ({ app }) => {
  const pinia = createPinia()
  pinia.use(({ store }) => {
    const initialState = cloneDeep(store.$state)
    // eslint-disable-next-line no-param-reassign
    store.$reset = () => {
      store.$patch(cloneDeep(initialState))
    }
  })
  app.use(pinia)
}
