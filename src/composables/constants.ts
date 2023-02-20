import { clusterApiUrl, Commitment } from '@solana/web3.js'

export function useConstants() {
  const endpoint =
    import.meta.env.VITE_ALCHEMY_RPC_URL || clusterApiUrl('devnet')
  const commitmentLevel: Commitment = 'processed'
  const network = 'http://localhost:3333/'
  const LAMPORTS = 1000000000

  return {
    commitmentLevel,
    endpoint,
    network,
    LAMPORTS,
  }
}
