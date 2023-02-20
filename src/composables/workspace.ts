import { useWallet } from 'solana-wallets-vue'
import { Connection } from '@solana/web3.js'

export function useWorkspace() {
  const { endpoint, commitmentLevel } = useConstants()
  const connection = new Connection(endpoint, commitmentLevel)

  async function checkIfWalletIsConnected() {
    const wallet = useWallet()
    try {
      await wallet.connect()
      return true
    } catch (error) {
      return false
    }
  }

  return {
    connection,
    checkIfWalletIsConnected,
  }
}
