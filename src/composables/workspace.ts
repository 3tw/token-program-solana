import { useWallet } from 'solana-wallets-vue'
import { Connection } from '@solana/web3.js'

export function useWorkspace() {
  const { endpoint, commitmentLevel } = useConstants()
  const connection = new Connection(endpoint, commitmentLevel)

  const walletIsConnected = computed(() => {
    const wallet = useWallet()
    return !!wallet.connected.value
  })
  
  return {
    connection,
    walletIsConnected,
  }
}
