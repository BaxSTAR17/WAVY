<script setup>
import {NuxtLayout} from '#components';
</script>

<template>
  <div>
    <NuxtProject>
      <NuxtLoadingIndicator />
      <NuxtLayout />
      <NuxtPage />
    </NuxtProject>
  </div>
</template>
