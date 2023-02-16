<script lang="ts" setup>
  import { WalletMultiButton } from 'solana-wallets-vue'
  import { router } from '~/router'

  const { walletIsConnected } = useWorkspace()
  const { api } = useApi()
  const students = ref()

  async function getStudentList() {
    try {
      const data = await api.students.getList()
      students.value = data
    } catch (error) {
      console.log(error)
    }
  }

  watchEffect(() => {
    if (!walletIsConnected.value) {
      router.push({ name: 'index' })
    }
  })

  onMounted(() => {
    getStudentList()
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
        <StudentsForm @student-added="getStudentList()" />
      </div>

      <div>
        <h2 class="text-lg font-medium mb-4">Meet the Students!</h2>
        <div class="flex flex-col gap-2">
          <div
            v-for="student in students"
            class="flex flex-col border-b border-gray-200 pb-2"
          >
            <p>{{ student.name }}</p>
            <p>{{ student.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </UiWrapper>
</template>
