import idl from '~/idl.json'
import {
  PublicKey,
  clusterApiUrl,
  Commitment,
} from '@solana/web3.js'

export function useConstants() {
  const endpoint =
    import.meta.env.VITE_ALCHEMY_RPC_URL || clusterApiUrl('devnet')
  const commitmentLevel: Commitment = 'processed'
  const network = 'http://localhost:3333/'

  /* Deployed Program info */
  const programId = new PublicKey(idl.metadata.address)
  const programInterface = JSON.parse(JSON.stringify(idl))

  return {
    commitmentLevel,
    endpoint,
    network,
    programId,
    programInterface,
  }
}
