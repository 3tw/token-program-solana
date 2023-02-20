<script lang="ts" setup>
  import { PublicKey } from '@solana/web3.js'
  import { useWallet } from 'solana-wallets-vue'

  const { api } = useApi()
  const { publicKey } = useWallet()
  const amount = ref()
  const destination = ref('')
  const tokenMint = ref('')

  async function mintTokens() {
    if (!publicKey.value || !amount.value || !tokenMint.value) return
    await api.tokens.mintTokens(
      new PublicKey(tokenMint.value),
      new PublicKey(destination.value),
      publicKey.value,
      amount.value,
    )
  }
</script>

<template>
  <div class="flex flex-col gap-2 max-w-xs">
    <UiInputText v-model="tokenMint" label="Token Mint" />
    <UiInputText v-model="destination" label="Recipient" />
    <UiInputNumber v-model="amount" label="Amount of Tokens to Mint" />
    <button
      class="bg-indigo-600 text-white rounded-md w-full px-6 py-3"
      @click="mintTokens()"
    >
      Mint Tokens
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
