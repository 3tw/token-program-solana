<script lang="ts" setup>
  import { PublicKey } from '@solana/web3.js'
  import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
  import { useStorage } from '@vueuse/core'
  import { router } from '~/router'
  import { LAMPORTS } from '~/constants'

  const { connection } = useWorkspace()
  const { publicKey, connected } = useWallet()

  // Ui
  const userAccountBalance = ref<number | undefined>(undefined)
  const mintPubkey = useStorage('mint-address', '')
  const associatedTokenAccountPubkey = useStorage(
    'associated-token-address',
    '',
  )

  async function setUserBalance(publicKey: PublicKey | null) {
    if (!publicKey) return
    try {
      const balance = await getAccountBalance(publicKey)
      if (!balance) return
      userAccountBalance.value = balance
    } catch (error) {}
  }

  async function getAccountBalance(publicKey: PublicKey) {
    if (!publicKey) return null
    try {
      const accountInfo = await connection.getAccountInfo(publicKey)
      if (!accountInfo?.lamports) return null
      return accountInfo.lamports
    } catch (error) {}
  }

  watch(
    publicKey,
    (newValue) => {
      setUserBalance(newValue)
    },
    { immediate: true },
  )
  watch(
    mintPubkey,
    (newValue, _old) => {
      mintPubkey.value = newValue
    },
    { immediate: true },
  )
  watchEffect(() => {
    if (!connected.value) {
      router.push({ name: 'index' })
    }
  })
</script>

<template>
  <UiWrapper class="min-h-screen flex flex-col gap-10 dark:text-white">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-medium dark:text-white">Token program</h1>
      <WalletMultiButton />
    </div>

    <div class="flex flex-col gap-2">
      <div
        v-if="connected && userAccountBalance !== undefined"
        class="flex gap-2"
      >
        <span class="text-base font-medium">SOL Balance:</span>
        <span>{{ userAccountBalance / LAMPORTS }}</span>
      </div>
      <div v-if="mintPubkey" class="flex flex-col">
        <span class="font-medium">Current Mint Public Key:</span>
        <span>{{ mintPubkey }}</span>
      </div>
      <div v-if="associatedTokenAccountPubkey" class="flex flex-col">
        <span class="font-medium">Associated Token Account:</span>
        <span>{{ associatedTokenAccountPubkey }}</span>
      </div>
    </div>

    <UiTabs />
    <RouterView />
  </UiWrapper>
</template>
