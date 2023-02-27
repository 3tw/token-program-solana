<script lang="ts" setup>
  interface Props {
    type?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    type: 'primary',
  })
  const attrs = useAttrs()
</script>

<template>
  <button
    type="button"
    :class="[
      {
        'disabled opacity-60 cursor-not-allowed no-underline': attrs.disabled,
      },
      props.type === 'primary'
        ? 'bg-indigo-600 text-white rounded-md w-full px-6 py-3'
        : 'border rounded-md px-2 py-2 bg-white text-indigo-600 border-indigo-600 dark:bg-indigo-200 dark:border-indigo-200 focus:ring-1 focus:ring-indigo-600 focus:shadow-none',
    ]"
  >
    <slot> Button text </slot>
  </button>
</template>
