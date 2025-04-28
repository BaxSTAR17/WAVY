<script setup>
import {NuxtLayout} from '#components';

useHead({
  title: 'Home | Wavy',
  meta: [
    { name: 'viewport', content: 'width=device-width; user-scalable=0;' }
  ]
})
</script>

<template>
  <div class="h-full bg-neutral-300 dark:bg-neutral-800">
      <NuxtLoadingIndicator color="purple"/>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<style>
html, body { margin: 0; padding: 0; height:100%}
</style>