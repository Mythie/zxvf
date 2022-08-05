import { computed, defineComponent, PropType, toRefs } from 'vue';

import { Button, ButtonComponentProps, ButtonComponentSize, BUTTON_COMPONENT_SIZES } from '~/styleguide/Button';

import GoogleIcon from '~icons/fa-brands/google';

import './ButtonGoogle.styles.css';

const BUTTON_GOOGLE_VARIANTS = ['filled', 'outline'] as const;

export type ButtonGoogleVariant = typeof BUTTON_GOOGLE_VARIANTS[number];

export type ButtonGoogleComponentProps = Pick<ButtonComponentProps, 'block' | 'size' | 'type'> & {
  variant: ButtonGoogleVariant;
};

export const ButtonGoogleComponent = defineComponent({
  name: 'ButtonGoogleComponent',

  props: {
    block: {
      type: Boolean as PropType<boolean>,
      default: false,
    },

    variant: {
      type: String as PropType<'filled' | 'outline'>,
      default: 'filled',
    },

    size: {
      type: String as PropType<ButtonComponentSize>,
      default: 'md',
      validator: (value: ButtonComponentSize) => BUTTON_COMPONENT_SIZES.includes(value),
    },

    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
  },

  setup: (props, { slots, attrs }) => {
    const { block, size, type, variant } = toRefs(props);

    const classNames = computed(() => ({
      ['hover:opacity-90 focus:opacity-90']: true,
      ['bg-google-red ring-google-red']: variant.value === 'filled',
      ['border-2 border-google-red text-google-red ring-google-red hover:bg-google-red-lightest focus:bg-google-red-lightest focus:ring-0']:
        variant.value === 'outline',
    }));

    return () => (
      <Button
        block={block.value}
        type={type.value}
        size={size.value}
        variant=""
        class={classNames.value}
        leftIcon={<GoogleIcon />}
        {...attrs}
      >
        {slots.default && slots.default()}
      </Button>
    );
  },
});
