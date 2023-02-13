<script setup lang="ts">
  useHead({
    title: 'Anchor+Vue3',
    meta: [{ name: 'description', content: 'Vue3 template for Anchor' }],
    link: [
      {
        rel: 'icon',
        href: '/favicon.ico',
        sizes: 'any',
      },
    ],
  })
</script>

<template>
  <RouterView />
</template>
