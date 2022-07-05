import { computed, defineComponent, PropType, toRefs, VNode } from 'vue';

export const NATIVE_INPUT_COMPONENT_SIZES = ['sm', 'md', 'lg'] as const;

export type NativeInputComponentSize = typeof NATIVE_INPUT_COMPONENT_SIZES[number];

export interface NativeInputComponentProps {
  id: string;
  modelValue: string;
  focusRing: boolean;
  size: NativeInputComponentSize;
  type: HTMLInputElement['type'];
  error: string;
  leftIcon: VNode | null;
  rightIcon: VNode | null;
}

export const NativeInputComponent = defineComponent({
  name: 'NativeInput',

  props: {
    id: {
      type: String as PropType<NativeInputComponentProps['id']>,
      default: '',
    },

    modelValue: {
      type: String as PropType<NativeInputComponentProps['modelValue']>,
      default: '',
    },

    focusRing: {
      type: Boolean as PropType<NativeInputComponentProps['focusRing']>,
      default: true,
    },

    size: {
      type: String as PropType<NativeInputComponentProps['size']>,
      default: 'md',
      validator: (value: NativeInputComponentProps['size']) => NATIVE_INPUT_COMPONENT_SIZES.includes(value),
    },

    type: {
      type: String as PropType<NativeInputComponentProps['type']>,
      default: 'text',
    },

    error: {
      type: String as PropType<NativeInputComponentProps['error']>,
      default: '',
    },

    leftIcon: {
      type: Object as PropType<NativeInputComponentProps['leftIcon']>,
      default: null,
    },

    rightIcon: {
      type: Object as PropType<NativeInputComponentProps['rightIcon']>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, { attrs, emit }) => {
    const { id, focusRing, size, type, error, leftIcon, rightIcon } = toRefs(props);

    const classes = computed(() => {
      return {
        ['w-full border']: true,
        ['transition-color duration-300']: true,
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
      set: (value: string) => {
        emit('update:modelValue', value);
      },
    });

    return () => (
      <div>
        <div class="relative">
          <input
            id={id.value || undefined}
            type={type.value}
            class={classes.value}
            v-model={modelValue.value}
            {...attrs}
          />

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

        {error.value && <div class="pt-2 text-xs tracking-wide text-red-600">{error.value}</div>}
      </div>
    );
  },
});
