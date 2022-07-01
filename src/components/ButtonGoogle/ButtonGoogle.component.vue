<script lang="ts" setup>
import { computed, PropType } from 'vue';

import { Button } from '~/styleguide/Button';
import GoogleIcon from '~icons/fa-brands/google';

const props = defineProps({
  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  color: {
    type: String as PropType<'filled' | 'outline'>,
    default: 'filled',
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

const classNames = computed(() => ({
  ['hover:opacity-90 focus:opacity-90']: true,
  ['bg-google-red ring-google-red']: props.color === 'filled',
  ['border-2 border-google-red text-google-red ring-google-red hover:bg-google-red-lightest focus:bg-google-red-lightest focus:ring-0']:
    props.color === 'outline',
}));
</script>

<template>
  <Button :block="props.block" :type="props.type" :size="props.size" color="" :class="classNames">
    <template #leftIcon>
      <GoogleIcon />
    </template>

    <slot />
  </Button>
</template>

<style>
.bg-google-red {
  background-color: rgba(222, 82, 70);
}

.hover\:bg-google-red-lightest:hover {
  background-color: rgba(222, 82, 70, 0.05);
}

.focus\:bg-google-red-lightest:focus {
  background-color: rgba(222, 82, 70, 0.15);
}

.ring-google-red {
  --tw-ring-color: rgba(222, 82, 70);
}

.border-google-red {
  border-color: rgba(222, 82, 70);
}

.text-google-red {
  color: rgba(222, 82, 70);
}
</style>
