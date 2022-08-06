import { computed, defineComponent, PropType } from 'vue';

export interface CardComponentProps {
  title: string;
}

export const CardComponent = defineComponent({
  name: 'Card',

  props: {
    title: {
      type: String as PropType<CardComponentProps['title']>,
      default: '',
    },
  },

  setup: (props, { slots }) => {
    const title = computed(() => {
      if (props.title) {
        return <h4 class="pb-3 text-lg font-medium leading-tight">{props.title}</h4>;
      }

      if (slots.title) {
        return slots.title();
      }

      return null;
    });

    return () => (
      <div class=" relative w-full rounded-md border border-gray-50 bg-white p-5 shadow dark:border-slate-500 dark:bg-slate-700 dark:text-white">
        {title.value}

        <div class="leading-relaxed">{slots.default && slots.default()}</div>
      </div>
    );
  },
});
