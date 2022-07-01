<script lang="ts" setup>
import { computed, PropType, useSlots } from 'vue';

import { Optional } from '~/types/util';

const props = defineProps({
  id: {
    type: String as PropType<Optional<string>>,
    default: undefined,
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
    type: String as PropType<HTMLInputElement['type']>,
    default: 'text',
  },

  error: {
    type: String as PropType<string>,
    default: '',
  },
});

const slots = useSlots();

const classes = computed(() => {
  return {
    ['w-full border']: true,
    ['transition-color duration-300']: true,
    ['focus:outline focus:outline-offset-[-1px] focus:outline-2 focus:outline-blue-500']: props.focusRing,
    ['py-1 px-2']: props.size === 'sm',
    ['py-2 px-3']: props.size === 'md',
    ['py-3 px-5']: props.size === 'lg',
    ['text-sm text-gray-700 rounded-md']: true,
    ['pl-10']: slots.leftIcon,
    ['pr-10']: slots.rightIcon,
    ['outline-red-500 focus:outline-red-500']: props.error,
  };
});
</script>

<template>
  <div>
    <div class="relative">
      <input :id="props.id" :type="props.type" :class="classes" />

      <div v-if="slots.leftIcon" class="absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500">
        <slot name="leftIcon" />
      </div>

      <div v-if="slots.rightIcon" class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
        <slot name="rightIcon" />
      </div>
    </div>

    <div class="pt-2 text-xs tracking-wide text-red-600">
      {{ error }}
    </div>
  </div>
</template>
