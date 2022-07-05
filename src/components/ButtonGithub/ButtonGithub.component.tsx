import { computed, defineComponent, PropType, toRefs } from 'vue';

import { Button, ButtonComponentProps, ButtonComponentSize, BUTTON_COMPONENT_SIZES } from '~/styleguide/Button';
import GithubIcon from '~icons/fa-brands/github';

import './ButtonGithub.styles.css';

const BUTTON_GITHUB_VARIANTS = ['filled', 'outline'] as const;

export type ButtonGithubVariant = typeof BUTTON_GITHUB_VARIANTS[number];

export type ButtonGithubComponentProps = Pick<ButtonComponentProps, 'block' | 'size' | 'type'> & {
  variant: ButtonGithubVariant;
};

export const ButtonGithubComponent = defineComponent({
  name: 'ButtonGithubComponent',

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
      ['bg-github-black ring-github-black']: variant.value === 'filled',
      ['border-2 border-github-black text-github-black ring-github-black hover:bg-github-black-lightest focus:bg-github-black-lightest focus:ring-0']:
        variant.value === 'outline',
    }));

    return () => (
      <Button
        block={block.value}
        type={type.value}
        size={size.value}
        variant=""
        class={classNames.value}
        leftIcon={<GithubIcon />}
        {...attrs}
      >
        {slots.default && slots.default()}
      </Button>
    );
  },
});
