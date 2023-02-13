<script lang="ts" setup>
  import { Keypair } from '@solana/web3.js'

  const { api } = useApi()
  const { wallet } = useWorkspaceStore()
  const messageInput = ref('')
  const programMessage = ref('')
  const messageAccount = ref()

  async function createMessage() {
    if (!wallet) return
    try {
      const message = await api.messages.create(
        messageInput.value,
        wallet,
        messageAccount.value,
      )
      if (!message) throw Error('Message account undefined')
      programMessage.value = message.content.toString()
    } catch (error) {
      console.log(error)
    }
  }
  async function updateMessage() {
    if (!wallet) return
    try {
      const message = await api.messages.update(
        messageInput.value,
        wallet,
        messageAccount.value,
      )
      if (!message) throw Error('Message account undefined')
      programMessage.value = message.content.toString()
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => {
    messageAccount.value = Keypair.generate()
  })
</script>

<template>
  <div class="flex flex-col gap-4">

    <div class="flex gap-3">
      <input
        type="text"
        v-model="messageInput"
        class="rounded-md border-gray-400 px-3 py-2 max-w-xs"
      />

      <button
        @click="programMessage ? updateMessage() : createMessage()"
        class="bg-indigo-600 text-white rounded-md w-max px-6 py-3"
      >
        {{ programMessage ? 'Update' : 'Create' }}
      </button>
    </div>

    <p
      v-if="programMessage"
      class="text-ellipsis overflow-hidden whitespace-nowrap"
    >
      Current message: {{ programMessage }}
    </p>
  </div>
</template>
