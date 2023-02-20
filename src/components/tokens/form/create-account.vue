<script lang="ts" setup>
  import { PublicKey } from '@solana/web3.js'
  import { useWallet } from 'solana-wallets-vue'
  import { useStorage } from '@vueuse/core'

  const { api } = useApi()
  const { publicKey } = useWallet()
  const associatedTokenAccountPubkey = useStorage(
    'associated-token-address',
    '',
  )
  const accountOwner = ref('')
  const tokenMint = ref('')

  async function createTokenAccount() {
    if (!publicKey.value || !tokenMint.value) return
    const associatedTokenAccount =
      await api.tokens.createAssociatedTokenAccount(
        publicKey.value,
        new PublicKey(tokenMint.value),
      )
    associatedTokenAccountPubkey.value =
      associatedTokenAccount?.toString() ?? ''
  }
</script>

<template>
  <div class="flex flex-col gap-2 max-w-xs">
    <UiInputText label="Token Mint" v-model="tokenMint" />
    <div class="flex gap-4 items-end">
      <UiInputText
        label="Token Account Owner"
        v-model="accountOwner"
        class="mr-auto w-full"
      />
      <button
        class="basis-24 h-min border rounded-md px-2 py-2 bg-white text-indigo-600 border-indigo-600 dark:bg-indigo-200 dark:border-indigo-200 focus:ring-1 focus:ring-indigo-600 focus:shadow-none"
        @click="accountOwner = publicKey?.toString() ?? ''"
      >
        It's me
      </button>
    </div>
    <button
      class="bg-indigo-600 text-white rounded-md w-full px-6 py-3"
      @click="createTokenAccount()"
    >
      Create Token Account
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
