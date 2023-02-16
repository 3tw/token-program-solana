<script lang="ts" setup>
  import { useWallet } from 'solana-wallets-vue'
  import { Student } from './student'
  
  const { api } = useApi()
  const { publicKey } = useWallet()
  
  const student = reactive({ name: '', message: '' })

  function submit() {
    if (!publicKey.value) return
    api.message.create(new Student(student.name, student.message), publicKey.value)
  }
</script>

<template>
  <div class="flex flex-col gap-2 max-w-xs">
    <UiInputText v-model="student.name" label="What do we call you?*" />
    <UiInputTextarea
      v-model="student.message"
      label="What brings you to Solana, friend?*"
    />
    <button
      class="bg-indigo-600 text-white rounded-md w-full px-6 py-3"
      @click="submit()"
    >
      Submit
    </button>
  </div>
</template>
