import { useWallet } from 'solana-wallets-vue'
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)
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
      return { name: 'mint-tokens' }
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
