<script setup>
import {NuxtLayout} from '#components';
</script>

<template>
  <div>
    <NuxtProject>
      <NuxtLoadingIndicator color="purple"/>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NuxtProject>
  </div>
</template>
