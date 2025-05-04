<script setup>
import {NuxtLayout} from '#components';

useHead({
  title: 'Home | Wavy',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width; initial-scale=1'
    },
    {
      name: 'description',
      content: 'A dynamic podcast hosting and listening platform designed to simplify the creation, distribution, and discovery of podcasts'
    },
    {
      name: 'author',
      content: 'RGBStudios'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <UApp>
    <VitePwaManifest />
    <div class="h-full bg-neutral-300 dark:bg-neutral-800">
        <NuxtLoadingIndicator color="purple"/>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
    </div>
  </UApp>
</template>

<style>
html, body { margin: 0; padding: 0; height:100%}
</style>