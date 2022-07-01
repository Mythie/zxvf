<script lang="ts" setup>
import { computed, PropType } from 'vue';

const props = defineProps({
  block: {
    type: Boolean as PropType<boolean>,
    default: false,
  },

  focusRing: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },

  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },

  color: {
    type: String as PropType<
      'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | ''
    >,
    default: 'primary',
  },
});

const classes = computed(() => {
  return {
    ['w-full']: props.block,
    ['transition-color duration-300']: true,
    ['ring-offset-2 focus:ring-2']: props.focusRing,
    ['py-1 px-3']: props.size === 'sm',
    ['py-3 px-5']: props.size === 'md',
    ['py-5 px-10']: props.size === 'lg',
    ['text-sm text-white rounded-md']: true,
    ['bg-blue-500 hover:opacity-90 focus:opacity-90 focus:ring-blue-500']: props.color === 'primary',
    ['bg-blue-100 text-blue-700 hover:bg-blue-200 focus:bg-blue-200 focus:ring-blue-200']: props.color === 'secondary',
    ['bg-green-500 hover:opacity-90 focus:opacity-90 focus:ring-green-500']: props.color === 'success',
    ['bg-red-500 hover:opacity-90 focus:opacity-90 focus:ring-red-500']: props.color === 'danger',
    ['bg-yellow-500 hover:opacity-90 focus:opacity-90 focus:ring-yellow-500']: props.color === 'warning',
    ['bg-blue-500  hover:opacity-90 focus:opacity-90 focus:ring-blue-500']: props.color === 'info',
    ['bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-50 focus:bg-blue-50 focus:ring-blue-700']:
      props.color === 'light',
    ['bg-gray-600 hover:opacity-90 focus:opacity-90 focus:ring-gray-600']: props.color === 'dark',
  };
});
</script>

<template>
  <button :type="props.type" :class="classes">
    <div class="flex items-center justify-center gap-x-2">
      <slot name="leftIcon" />

      <span>
        <slot />
      </span>

      <slot name="rightIcon" />
    </div>
  </button>
</template>
