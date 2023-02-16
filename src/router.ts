import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function checkWalletAndRedirect(to: RouteLocationNormalized) {
  const { walletIsConnected } = useWorkspace()

  try {
    if (walletIsConnected.value && to.name === 'index') {
      console.log('go to dash')
      return { name: 'dashboard' }
    }
    if (!walletIsConnected.value && to.name !== 'index') {
      return { name: 'index' }
    }
  } catch (error) {
    console.log(error)
  }
}

router.beforeEach((to, from) => {
  checkWalletAndRedirect(to)
  return true
})

export { router, routes }
