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
  <div class="flex flex-col gap-2">
    <UiInputText label="Token Mint" v-model="tokenMint" />
    <div class="flex gap-4 items-end">
      <UiInputText
        label="Token Account Owner"
        v-model="accountOwner"
        class="mr-auto w-full"
      />
      <UiButton
        class="basis-24 h-min"
        type="secondary"
        @click="accountOwner = publicKey?.toString() ?? ''"
      >
        It's me
      </UiButton>
    </div>
    <UiButton @click="createTokenAccount()"> Create Token Account </UiButton>
  </div>
</template>

<style lang="scss" scoped></style>
