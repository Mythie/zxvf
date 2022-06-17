<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { defineAsyncComponent } from 'vue';

useHead({
  title: 'Hello World - Homepage',
});

const HelloWorld = defineAsyncComponent(() => import('../components/HelloWorld.vue'));
</script>

<template>
  <main class="flex flex-col items-center justify-center max-w-lg mx-auto font-sans leading-loose">
    <img alt="Vue logo" src="../assets/logo.png" class="w-16 pb-5 animate-bounce" />

    <HelloWorld class="text-center" msg="Hello Vue 3 + TypeScript + Vite" />
  </main>
</template>
