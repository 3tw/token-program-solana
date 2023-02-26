import { useWallet } from 'solana-wallets-vue'
import { Connection, clusterApiUrl, Commitment } from '@solana/web3.js'

export function useWorkspace() {
  const endpoint =
    import.meta.env.VITE_ALCHEMY_RPC_URL || clusterApiUrl('devnet')
  const commitmentLevel: Commitment = 'processed'
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
