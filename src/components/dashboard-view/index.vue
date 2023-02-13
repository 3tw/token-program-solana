<script lang="ts" setup>
  import { WalletMultiButton } from 'solana-wallets-vue'
  import { router } from '~/router'

  const workspaceStore = useWorkspaceStore()

  watchEffect(() => {
    if (!workspaceStore.walletIsConnected) {
      router.push({ name: 'index' })
    }
  })
</script>

<template>
  <UiWrapper
    class="min-h-screen flex flex-col items-start justify-center gap-10"
  >
    <img class="h-12 w-auto" src="solanaLogoMark.png" alt="Your Company" />
    <div class="grid lg:grid-cols-2 w-full gap-y-8">
      <div class="flex flex-col gap-8 mx-auto w-full">
        <WalletMultiButton />

        <div class="flex flex-col">
          <span class="font-medium"> Your public key: </span>
          <p class="overflow-ellipsis overflow-hidden whitespace-nowrap">
            {{ workspaceStore.wallet?.publicKey.toBase58() }}
          </p>
        </div>
      </div>

      <DashboardViewMessages class="flex items-start mx-auto w-full" />
    </div>
  </UiWrapper>
</template>
