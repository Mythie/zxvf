<script setup lang="ts">
import './App.css';

import { useHead } from '@vueuse/head';
import { RouterView } from 'vue-router';

useHead({
  title: 'Hello World',
});
</script>

<template>
  <main class="flex flex-col min-h-screen bg-gray-50">
    <Suspense>
      <RouterView class="flex-1" />

      <template #fallback>
        <div>
          <div class="text-center">
            <div class="animate-spin">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </template>
    </Suspense>
  </main>
</template>
