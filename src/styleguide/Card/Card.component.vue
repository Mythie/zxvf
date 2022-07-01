<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: '',
  },
});
</script>

<template>
  <div
    class="w-full p-5 bg-white border rounded-md shadow dark:bg-slate-700 dark:text-white border-gray-50 dark:border-slate-500"
  >
    <template v-if="props.title">
      <h4 class="pb-3 text-lg font-medium leading-tight">
        {{ props.title }}
      </h4>
    </template>

    <div class="leading-relaxed">
      <slot />
    </div>
  </div>
</template>
