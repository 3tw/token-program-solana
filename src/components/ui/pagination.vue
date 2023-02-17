<script lang="ts" setup>
  import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

  interface Props {
    page: number
    pageSize: number
    totalItems: number
  }
  const props = withDefaults(defineProps<Props>(), {
    page: 0,
    pageSize: 0,
    totalItems: 0,
  })
  const emit = defineEmits<{
    (e: 'update-page', value: number): void
  }>()

  const pagesTotal = computed(() => {
    const reminder = props.totalItems % props.pageSize
    const fullPages = (props.totalItems - reminder) / props.pageSize

    return (reminder ? 1 : 0) + fullPages
  })
  // Note: add + 1 inside the template to show page 0 as page 1 etc.
  const currentPage = computed({
    get() {
      return props.page
    },
    set(newValue: number) {
      if (
        newValue === -1 ||
        props.page === newValue ||
        newValue < 0 ||
        newValue >= pagesTotal.value
      ) {
        return
      }
      emit('update-page', newValue)
    },
  })
  const pages = computed(() => {
    if (pagesTotal.value < 6) return [...Array(pagesTotal.value).keys()]
    const pagesToShow = []
    for (let i = -2; i <= 2; i++) {
      const pageSuggestion = currentPage.value + i
      if (pageSuggestion >= 0 && pageSuggestion < pagesTotal.value)
        pagesToShow.push(pageSuggestion)
    }
    return pagesToShow
  })
</script>

<template>
  <div class="flex items-center justify-between py-3">
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-800 hover:bg-gray-50"
      >
        Previous
      </button>
      <button
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-800 hover:bg-gray-50"
      >
        Next
      </button>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-base text-gray-800">
          Showing
          <span class="font-medium">
            {{ props.pageSize * (props.page + 1) - 9 }}
          </span>
          to
          <span class="font-medium">
            {{
              props.pageSize * (props.page + 1) < props.totalItems
                ? props.pageSize * (props.page + 1)
                : props.totalItems
            }}
          </span>
          of
          <span class="font-medium">{{ props.totalItems }}</span>
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="currentPage = 0"
          >
            <span>First</span>
          </button>
          <button
            class="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="currentPage = page - 1"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            v-for="page in pages"
            class="relative inline-flex items-center border border-gray-300 px-4 py-2 text-base font-medium focus:z-20"
            :class="[
              currentPage === page
                ? 'bg-indigo-100 border-indigo-400 z-30 cursor-auto'
                : 'bg-white hover:bg-gray-100',
            ]"
            @click="currentPage = page"
          >
            {{ page + 1 }}
          </button>
          <button
            class="relative inline-flex items-center border border-gray-300 bg-white px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="currentPage = page + 1"
          >
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            @click="currentPage = pagesTotal - 1"
          >
            <span>Last</span>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
