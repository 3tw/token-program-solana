<script lang="ts" setup>
  import { PublicKey } from '@solana/web3.js'
  import { useWallet } from 'solana-wallets-vue'

  interface Props {
    mint: string
    recipient: string
  }
  const props = withDefaults(defineProps<Props>(), {
    mint: '',
    recipient: '',
  })

  const { api } = useApi()
  const { publicKey } = useWallet()
  const amount = ref()
  const recipient = ref('')
  const tokenMint = ref('')

  async function mintTokens() {
    if (!publicKey.value || !amount.value || !tokenMint.value) return
    await api.tokens.mintTokens(
      new PublicKey(tokenMint.value),
      new PublicKey(recipient.value),
      publicKey.value,
      amount.value,
    )
  }

  watchEffect(() => {
    tokenMint.value = props.mint
    recipient.value = props.recipient
  })
</script>

<template>
  <div class="flex flex-col gap-2">
    <UiInputText v-model="tokenMint" label="Token Mint" />
    <UiInputText v-model="recipient" label="Recipient" />
    <UiInputNumber v-model="amount" label="Amount of Tokens to Mint" />
    <UiButton @click="mintTokens()"> Mint Tokens </UiButton>
  </div>
</template>

<style lang="scss" scoped></style>
