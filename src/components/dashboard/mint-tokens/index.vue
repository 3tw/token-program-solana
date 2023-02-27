<script lang="ts" setup>
  import { useStorage } from '@vueuse/core'

  const mintPubkey = useStorage('mint-address', '')
  const associatedTokenAccountPubkey = useStorage(
    'associated-token-address',
    '',
  )
</script>

<template>
  <div class="flex gap-x-12 gap-y-8">
    <div class="flex flex-col gap-4 flex-1">
      <DashboardMintTokensFormCreateMint />
      <DashboardMintTokensFormCreateAccount />
    </div>
    <div class="flex-1">
      <DashboardMintTokensFormMintTokens
        :mint="mintPubkey"
        :recipient="associatedTokenAccountPubkey"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
