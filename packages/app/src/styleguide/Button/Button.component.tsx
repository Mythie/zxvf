import { computed, defineComponent, PropType, toRefs, VNode } from 'vue';

export const BUTTON_COMPONENT_SIZES = ['sm', 'md', 'lg'] as const;

export type ButtonComponentSize = typeof BUTTON_COMPONENT_SIZES[number];

export const BUTTON_COMPONENT_TYPES = ['button', 'submit', 'reset'] as const;

export type ButtonComponentType = typeof BUTTON_COMPONENT_TYPES[number];

export const BUTTON_COMPONENT_VARIANTS = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
  'text',
  '',
] as const;

export type ButtonComponentVariant = typeof BUTTON_COMPONENT_VARIANTS[number];

export interface ButtonComponentProps {
  block: boolean;
  focusRing: boolean;
  disabled: boolean;
  size: ButtonComponentSize;
  type: ButtonComponentType;
  variant: ButtonComponentVariant;
  leftIcon: VNode | null;
  rightIcon: VNode | null;
}

export const ButtonComponent = defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Button',

  props: {
    block: {
      type: Boolean,
      default: false,
    },

    focusRing: {
      type: Boolean,
      default: true,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String as PropType<ButtonComponentProps['size']>,
      default: 'md',
      validator: (value: ButtonComponentSize) => BUTTON_COMPONENT_SIZES.includes(value),
    },

    type: {
      type: String as PropType<ButtonComponentProps['type']>,
      default: 'button',
      validator: (value: ButtonComponentType) => BUTTON_COMPONENT_TYPES.includes(value),
    },

    variant: {
      type: String as PropType<ButtonComponentProps['variant']>,
      default: '',
      validator: (value: ButtonComponentVariant) => BUTTON_COMPONENT_VARIANTS.includes(value),
    },

    leftIcon: {
      type: Object as PropType<ButtonComponentProps['leftIcon']>,
      default: null,
    },

    rightIcon: {
      type: Object as PropType<ButtonComponentProps['rightIcon']>,
      default: null,
    },
  },

  setup: (props, { slots, attrs }) => {
    const { block, focusRing, disabled, size, type, variant, leftIcon, rightIcon } = toRefs(props);

    const classes = computed(() => {
      return {
        ['w-full']: block.value,
        ['transition-colors duration-300']: true,
        ['text-sm text-white rounded-md']: true,
        ['ring-offset-2 focus:ring-2']: focusRing.value && variant.value !== 'text',
        ['py-1 px-3']: size.value === 'sm' && variant.value !== 'text',
        ['py-3 px-5']: size.value === 'md' && variant.value !== 'text',
        ['py-5 px-10']: size.value === 'lg' && variant.value !== 'text',
        ['text-sm']: size.value === 'sm' && variant.value === 'text',
        ['text-base']: size.value === 'md' && variant.value === 'text',
        ['text-lg']: size.value === 'lg' && variant.value === 'text',
        ['font-medium text-blue-500 p-0']: variant.value === 'text',
        ['bg-blue-500 hover:opacity-90 focus:opacity-90 focus:ring-blue-500']: variant.value === 'primary',
        ['bg-blue-100 text-blue-700 hover:bg-blue-200 focus:bg-blue-200 focus:ring-blue-200']:
          variant.value === 'secondary',
        ['bg-green-500 hover:opacity-90 focus:opacity-90 focus:ring-green-500']: variant.value === 'success',
        ['bg-red-500 hover:opacity-90 focus:opacity-90 focus:ring-red-500']: variant.value === 'danger',
        ['bg-yellow-500 hover:opacity-90 focus:opacity-90 focus:ring-yellow-500']: variant.value === 'warning',
        ['bg-blue-500  hover:opacity-90 focus:opacity-90 focus:ring-blue-500']: variant.value === 'info',
        ['bg-white text-blue-700 border-2 border-blue-700 hover:bg-blue-50 focus:bg-blue-50 focus:ring-blue-700']:
          variant.value === 'light',
        ['bg-gray-600 hover:opacity-90 focus:opacity-90 focus:ring-gray-600']: variant.value === 'dark',
        ['opacity-50 cursor-not-allowed pointer-events-none']: disabled.value,
      };
    });

    return () => (
      <button type={type.value} class={classes.value} disabled={disabled.value} {...attrs}>
        <div class="flex items-center justify-center gap-x-2">
          {leftIcon.value && <span>{leftIcon.value}</span>}

          <span>{slots.default && slots.default()}</span>

          {rightIcon.value && <span>{rightIcon.value}</span>}
        </div>
      </button>
    );
  },
});
