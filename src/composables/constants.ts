import {
  clusterApiUrl,
  Commitment,
} from '@solana/web3.js'

export function useConstants() {
  const endpoint =
    import.meta.env.VITE_ALCHEMY_RPC_URL || clusterApiUrl('devnet')
  const commitmentLevel: Commitment = 'processed'
  const network = 'http://localhost:3333/'
  const STUDENT_INTRO_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf'

  return {
    commitmentLevel,
    endpoint,
    network,
    STUDENT_INTRO_PROGRAM_ID,
  }
}
