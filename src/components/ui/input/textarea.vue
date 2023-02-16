<script lang="ts" setup>
  interface Props {
    label?: string
    modelValue?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    label: undefined,
    modelValue: '',
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
    <textarea
      v-model="value"
      rows="6"
      class="rounded-md border-gray-400 px-3 py-2 max-w-xs"
    />
  </label>
</template>
