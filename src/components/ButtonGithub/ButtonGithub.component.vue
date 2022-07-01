<script lang="ts" setup>
import { PropType } from 'vue';

import { Button } from '~/styleguide/Button';
import GithubIcon from '~icons/fa-brands/github';

const props = defineProps({
  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },

  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
});
</script>

<template>
  <Button v-bind="props" color="" class="bg-github-black ring-github-black hover:opacity-90 focus:opacity-90">
    <template #leftIcon>
      <GithubIcon />
    </template>

    <slot />
  </Button>
</template>

<style>
.bg-github-black {
  background-color: #24292e;
}

.ring-github-black {
  --tw-ring-color: #24292e;
}
</style>
