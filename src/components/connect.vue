<script lang="ts" setup>
  import { useWallet, WalletMultiButton } from 'solana-wallets-vue'
  import { router } from '~/router'
  const { connected } = useWallet()

  watchEffect(() => {
    if (connected.value) {
      router.push({ name: 'dashboard' })
    }
  })
</script>

<template>
  <UiWrapper class="min-h-screen flex items-center">
    <div class="lg:grid lg:grid-cols-5 w-full gap-x-20 gap-y-12">
      <div class="flex flex-col justify-center lg:col-span-2 lg:my-44">
        <div class="mx-auto w-full">
          <div>
            <img
              class="h-12 w-auto"
              src="/solanaLogoMark.png"
              alt="Your Company"
            />
          </div>

          <div class="flex flex-col space-y-6 mt-8">
            <h2 class="mt-6 text-3xl font-medium tracking-tight text-gray-900">
              Connect your wallet
            </h2>
            <WalletMultiButton />
          </div>
        </div>
      </div>
      <img
        class="hidden h-full w-full object-cover lg:block lg:col-span-3"
        src="/home-page.jpg"
        alt=""
      />
    </div>
  </UiWrapper>
</template>
