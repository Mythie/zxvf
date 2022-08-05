import { computed, defineComponent, PropType, toRefs } from 'vue';

export interface AvatarComponentProps {
  url: string | null;
  alt: string | null;
  text: string | null;
  circle: boolean;
}

export const AvatarComponent = defineComponent({
  name: 'AvatarComponent',

  props: {
    url: {
      type: String as PropType<AvatarComponentProps['url']>,
      default: null,
    },

    alt: {
      type: String as PropType<AvatarComponentProps['alt']>,
      default: null,
    },

    text: {
      type: String as PropType<AvatarComponentProps['text']>,
      default: null,
    },

    circle: {
      type: Boolean as PropType<AvatarComponentProps['circle']>,
      default: true,
    },
  },

  setup: (props) => {
    const { url, alt, text, circle } = toRefs(props);

    const classes = computed(() => ({
      'flex flex-col items-center justify-center': true,
      'overflow-hidden border bg-white': true,
      'rounded-full': circle.value,
      'rounded-md': !circle.value,
    }));

    return () => (
      <div class={classes.value}>
        {url.value && <img src={url.value} alt={alt.value || 'Avatar'} class="aspect-square h-10 w-10 object-cover" />}

        {text.value && (
          <div class="bg-gray flex h-10 w-10 items-center justify-center bg-gray-100 text-sm">{text.value}</div>
        )}
      </div>
    );
  },
});
