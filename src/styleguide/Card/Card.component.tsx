import { defineComponent, PropType, toRefs } from 'vue';

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
    const { title } = toRefs(props);

    return () => (
      <div class="w-full p-5 bg-white border rounded-md shadow dark:bg-slate-700 dark:text-white border-gray-50 dark:border-slate-500">
        {title && <h4 class="pb-3 text-lg font-medium leading-tight">{title.value}</h4>}

        <div class="leading-relaxed">{slots.default && slots.default()}</div>
      </div>
    );
  },
});
