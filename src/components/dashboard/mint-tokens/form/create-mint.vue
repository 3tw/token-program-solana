<script lang="ts" setup>
  import { useWallet } from 'solana-wallets-vue'
  import { useStorage } from '@vueuse/core'

  const { api } = useApi()
  const { publicKey } = useWallet()
  const mintPubkey = useStorage('mint-address', '')

  async function createMint() {
    if (!publicKey.value) return
    const { mintPubkeyString } = await api.tokens.createMint(publicKey.value, 0)
    mintPubkey.value = mintPubkeyString?.toString() ?? ''
  }
</script>

<template>
  <UiButton @click="createMint()">
    {{ mintPubkey ? 'Create new Mint' : 'Create Mint' }}
  </UiButton>
</template>

<style lang="scss" scoped></style>
