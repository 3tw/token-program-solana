<script lang="ts" setup>
  import { WalletMultiButton } from 'solana-wallets-vue'
  import { router } from '~/router'

  const { walletIsConnected } = useWorkspace()

  watchEffect(() => {
    if (!walletIsConnected.value) {
      router.push({ name: 'index' })
    }
  })
</script>

<template>
  <UiWrapper class="min-h-screen flex flex-col gap-10">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-medium text-black">Student introductions</h1>
      <WalletMultiButton />
    </div>

    <div class="flex flex-col space-y-10">
      <div>
        <h2 class="text-lg font-medium mb-4">Introduce Yourself</h2>
        <StudentsForm />
      </div>

      <div>
        <h2 class="text-lg font-medium mb-4">Meet the Students!</h2>
      </div>
    </div>
  </UiWrapper>
</template>
