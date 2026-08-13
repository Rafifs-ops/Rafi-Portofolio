<script setup>
import { RouterView } from 'vue-router';
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
