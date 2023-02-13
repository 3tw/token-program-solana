import { defineStore } from 'pinia'
import { useAnchorWallet, useWallet } from 'solana-wallets-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { AnchorProvider, Program } from '@project-serum/anchor'
import idl from '~/idl.json'

export const useWorkspaceStore = defineStore('workspace', () => {
  const { endpoint, commitmentLevel } = useConstants()
  const programID = new PublicKey(idl.metadata.address)
  const connection = new Connection(endpoint, commitmentLevel)
  const wallet = useAnchorWallet()

  const provider = computed(() => {
    if (!wallet.value || !connection) {
      console.log('Cannot create AnchorProvider')
      return
    }
    return new AnchorProvider(connection, wallet.value, {
      commitment: commitmentLevel,
    })
  })

  // @ts-ignore
  const program = computed(() => new Program(idl, programID, provider.value))

  async function checkWalletConnection(){
    try {
      const walletData = useWallet()
      await walletData.connect()
      return walletData.connected.value
    } catch (error) {
      console.log(error)
      return false
    }    
  }
  const walletIsConnected = computed(() => {
    const walletData = useWallet()
    return walletData.connected.value
  })

  return {
    wallet,
    connection,
    provider,
    program,
    walletIsConnected,
    checkWalletConnection,
  }
})
