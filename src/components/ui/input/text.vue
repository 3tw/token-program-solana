<script lang="ts" setup>
  interface Props {
    label?: string
    modelValue?: string
    isLoading?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    label: undefined,
    modelValue: '',
    isLoading: false,
  })
  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>

<template>
  <label class="flex flex-col text-sm">
    {{ props.label }}
    <div class="relative w-full max-w-xs">
      <input
        v-model="value"
        type="text"
        class="w-full rounded-md border-gray-400 px-3 py-2"
      />
      <div
        v-if="isLoading"
        class="absolute transform top-1/2 right-2 -translate-y-1/2 bg-white px-1"
      >
        <svg
          class="animate-spin h-5 w-5 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  </label>
</template>
