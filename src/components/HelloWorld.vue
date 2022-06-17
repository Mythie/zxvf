<script setup lang="ts">
import { ref } from 'vue';

import { Card } from '~/styleguide/Card';

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <Card>
    <h1 class="text-2xl font-bold leading-loose">{{ msg }}</h1>

    <p class="leading-loose">
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p class="leading-loose">See <code>README.md</code> for more information.</p>

    <p class="leading-loose">
      <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p class="leading-loose">
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </Card>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
