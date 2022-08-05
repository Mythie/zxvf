import { computed, defineComponent, PropType, toRefs, VNode } from 'vue';

import { NormalizedNativeSelectOption } from './NativeSelect.types';

export const NATIVE_SELECT_COMPONENT_SIZES = ['sm', 'md', 'lg'] as const;

export type NativeSelectComponentSize = typeof NATIVE_SELECT_COMPONENT_SIZES[number];

export interface NativeSelectComponentProps {
  id: string;
  modelValue: string;
  options: string[] | Array<{ label: string; value: string }>;
  focusRing: boolean;
  size: NativeSelectComponentSize;
  error: string;
  leftIcon: VNode | null;
  rightIcon: VNode | null;
}

export const NativeSelectComponent = defineComponent({
  name: 'NativeSelectComponent',

  props: {
    id: {
      type: String as PropType<NativeSelectComponentProps['id']>,
      default: '',
    },

    modelValue: {
      type: [String] as PropType<NativeSelectComponentProps['modelValue']>,
      default: '',
    },

    options: {
      type: Array as PropType<NativeSelectComponentProps['options']>,
      default: [] as Array<string>,
    },

    focusRing: {
      type: Boolean as PropType<NativeSelectComponentProps['focusRing']>,
      default: true,
    },

    size: {
      type: String as PropType<NativeSelectComponentProps['size']>,
      default: 'md',
      validator: (value: NativeSelectComponentProps['size']) => NATIVE_SELECT_COMPONENT_SIZES.includes(value),
    },

    error: {
      type: String as PropType<NativeSelectComponentProps['error']>,
      default: '',
    },

    leftIcon: {
      type: Object as PropType<NativeSelectComponentProps['leftIcon']>,
      default: null,
    },

    rightIcon: {
      type: Object as PropType<NativeSelectComponentProps['rightIcon']>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, { attrs, emit }) => {
    const { id, focusRing, size, error, leftIcon, rightIcon } = toRefs(props);

    const classes = computed(() => {
      return {
        ['w-full border']: true,
        ['transition-[outline] duration-300']: true,
        ['focus:outline focus:outline-offset-[-1px] focus:outline-2 focus:outline-blue-500']: focusRing.value,
        ['py-1 px-2']: size.value === 'sm',
        ['py-2 px-3']: size.value === 'md',
        ['py-3 px-5']: size.value === 'lg',
        ['text-sm text-gray-700 rounded-md']: true,
        ['pl-10']: leftIcon.value,
        ['pr-10']: rightIcon.value,
        ['outline-red-500 focus:outline-red-500']: error.value,
      };
    });

    const modelValue = computed({
      get: () => props.modelValue,
      set: (value: string | number) => {
        emit('update:modelValue', value);
      },
    });

    const options = computed<NormalizedNativeSelectOption[]>(() => {
      return props.options.map((o) => (typeof o === 'string' ? { label: o, value: o } : o));
    });

    return () => (
      <div>
        <div class="relative">
          <select id={id.value || undefined} class={classes.value} v-model={modelValue.value} {...attrs}>
            {options.value.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>

          {leftIcon.value && (
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500">
              {leftIcon.value}
            </div>
          )}

          {rightIcon.value && (
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500">
              {rightIcon.value}
            </div>
          )}
        </div>

        {error.value && <div class="mt-2 text-xs tracking-wide text-red-600">{error.value}</div>}
      </div>
    );
  },
});
