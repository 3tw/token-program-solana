import { useWallet } from 'solana-wallets-vue'
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

async function checkWalletAndRedirect(to: RouteLocationNormalized) {
  // const { checkIfWalletIsConnected } = useWorkspace()
  const { connected } = useWallet()

  try {
    // const walletIsConnected = await checkIfWalletIsConnected()
    const walletIsConnected = connected
    if (walletIsConnected && to.name === 'index') {
      return { name: 'dashboard' }
    }
    if (!walletIsConnected && to.name !== 'index') {
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
