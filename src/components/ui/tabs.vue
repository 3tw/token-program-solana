<script setup lang="ts">
  import { router } from '~/router'

  const tabs = [
    { name: 'Mint Tokens', routeName: 'mint-tokens' },
    { name: 'Swap Pool', routeName: 'swap-pool' },
  ]

  function checkIfCurrentRoute(routeName: string) {
    return router.currentRoute.value.name === routeName
  }
</script>

<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md dark:bg-slate-800 border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option
          v-for="tab in tabs"
          :key="tab.name"
          :selected="checkIfCurrentRoute(tab.routeName)"
        >
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-indigo-500">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <router-link
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.routeName"
            :class="[
              checkIfCurrentRoute(tab.routeName)
                ? 'border-indigo-500 text-indigo-600 dark:border-white dark:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
            ]"
          >
            {{ tab.name }}
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>
