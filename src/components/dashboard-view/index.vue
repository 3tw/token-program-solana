<script lang="ts" setup>
  import { WalletMultiButton, useWallet } from 'solana-wallets-vue'
  import { router } from '~/router'
  import { Student } from '../students/student'

  const { api } = useApi()
  const { publicKey } = useWallet()
  const { walletIsConnected } = useWorkspace()
  const defaultStudent: Student[] = []
  const students = ref(defaultStudent)

  const PAGE_SIZE = 10
  const page = ref(0)
  const studentsTotal = ref(0)
  const search = ref('')
  const loadingStudents = ref(false)
  const myStudentAccount = ref<Student | undefined | null>(undefined)

  async function getStudentList() {
    try {
      loadingStudents.value = true
      const accountsPublicKeys = await api.students.getAccounts(search.value)
      studentsTotal.value = accountsPublicKeys.length
      students.value = await api.students.getList(
        accountsPublicKeys,
        page.value,
        PAGE_SIZE,
      )
    } catch (error) {
      console.log(error)
    } finally {
      loadingStudents.value = false
    }
  }
  function updateStudentList(newPage = page.value) {
    console.log(newPage)
    page.value = newPage
    getStudentList()
  }

  async function getMyAccount() {
    if (!publicKey.value) return
    try {
      const student = await api.students.getAccount(publicKey.value)
      myStudentAccount.value = student ? student : null
    } catch (error) {}
  }

  // Got tired of reading "fuck" all the time, so here is a little regex to fix that
  function chillTheFckDown(text: string) {
    return text.replace(/\b(fuck)\b/gi, 'banana')
  }

  // Debounce search input, to send fewer requests
  const debounceTimeout = ref()
  watch(search, (newValue, oldValue) => {
    clearTimeout(debounceTimeout.value)
    debounceTimeout.value = setTimeout(() => {
      updateStudentList()
    }, 500)
  })
  watchEffect(() => {
    if (!walletIsConnected.value) {
      router.push({ name: 'index' })
    }
  })

  onMounted(() => {
    getStudentList()
    getMyAccount()
  })
</script>

<template>
  <UiWrapper class="min-h-screen flex flex-col gap-10">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-medium text-black">Student introductions</h1>
      <WalletMultiButton />
    </div>

    <div class="flex flex-col space-y-10">
      <div v-if="myStudentAccount">
        <h2 class="text-lg font-medium mb-4">Your data</h2>
        <h3 class="text-base text-black font-medium">
          {{ myStudentAccount.name }}
        </h3>
        <p>{{ myStudentAccount.message }}</p>
      </div>

      <div v-else-if="myStudentAccount === null">
        <h2 class="text-lg font-medium mb-4">Introduce Yourself</h2>
        <StudentsForm @student-added="getStudentList()" />
      </div>

      <div v-else><UiSpinner /></div>

      <div class="flex flex-col">
        <h2 class="text-lg font-medium">Meet the Students!</h2>
        <UiInputText
          v-model="search"
          :is-loading="loadingStudents"
          label="Search by name"
          class="mt-4"
        />

        <div class="flex flex-col gap-2 mt-8">
          <div
            v-for="student in students"
            class="flex flex-col border-b border-gray-200 pb-2"
          >
            <h3 class="text-base text-black font-medium">
              {{ chillTheFckDown(student.name) }}
            </h3>
            <p>{{ chillTheFckDown(student.message) }}</p>
          </div>
        </div>
      </div>

      <UiPagination
        v-if="students.length"
        :page="page"
        :pageSize="PAGE_SIZE"
        :totalItems="studentsTotal"
        @update-page="updateStudentList($event)"
      />
    </div>
  </UiWrapper>
</template>
