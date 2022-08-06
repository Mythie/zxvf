import { computed, defineComponent, PropType, toRefs, VNode } from 'vue';

export const NATIVE_INPUT_COMPONENT_SIZES = ['sm', 'md', 'lg'] as const;

export type NativeInputComponentSize = typeof NATIVE_INPUT_COMPONENT_SIZES[number];

export interface NativeInputComponentProps {
  id: string;
  modelValue: string | number;
  focusRing: boolean;
  size: NativeInputComponentSize;
  type: HTMLInputElement['type'];
  error: string;
  leftIcon: VNode | null;
  allowLeftIconClick: boolean;
  rightIcon: VNode | null;
  allowRightIconClick: boolean;
}

export const NativeInputComponent = defineComponent({
  name: 'NativeInputComponent',

  props: {
    id: {
      type: String as PropType<NativeInputComponentProps['id']>,
      default: '',
    },

    modelValue: {
      type: [String, Number] as PropType<NativeInputComponentProps['modelValue']>,
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

    allowLeftIconClick: {
      type: Boolean as PropType<NativeInputComponentProps['allowLeftIconClick']>,
      default: false,
    },

    rightIcon: {
      type: Object as PropType<NativeInputComponentProps['rightIcon']>,
      default: null,
    },

    allowRightIconClick: {
      type: Boolean as PropType<NativeInputComponentProps['allowRightIconClick']>,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, { attrs, emit }) => {
    const { id, focusRing, size, type, error, leftIcon, allowLeftIconClick, rightIcon, allowRightIconClick } =
      toRefs(props);

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
            <div
              class={{
                'pointer-events-none': !allowLeftIconClick.value,
                'absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-gray-500': true,
              }}
            >
              {leftIcon.value}
            </div>
          )}

          {rightIcon.value && (
            <div
              class={{
                'pointer-events-none': !allowRightIconClick.value,
                'absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500': true,
              }}
            >
              {rightIcon.value}
            </div>
          )}
        </div>

        {error.value && <div class="mt-2 text-xs tracking-wide text-red-600">{error.value}</div>}
      </div>
    );
  },
});
