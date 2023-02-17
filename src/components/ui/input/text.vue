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
        <UiSpinner />
      </div>
    </div>
  </label>
</template>
