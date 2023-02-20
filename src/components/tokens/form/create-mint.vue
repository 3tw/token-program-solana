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
  <button
    class="max-w-xs bg-indigo-600 text-white rounded-md w-full px-6 py-3"
    @click="createMint()"
  >
    {{ mintPubkey ? 'Create new Mint' : 'Create Mint' }}
  </button>
</template>

<style lang="scss" scoped></style>
