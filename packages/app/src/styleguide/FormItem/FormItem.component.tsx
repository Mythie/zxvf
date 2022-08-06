import { computed, defineComponent, PropType, ref, toRefs, Transition, watchEffect } from 'vue';

export interface FormItemComponentProps {
  label: string;
  description: string;
  error: string;
}

export const FormItemComponent = defineComponent({
  name: 'FormItemComponent',

  props: {
    label: {
      type: String as PropType<FormItemComponentProps['label']>,
      required: true,
    },

    description: {
      type: String as PropType<FormItemComponentProps['description']>,
      default: '',
    },

    error: {
      type: String as PropType<FormItemComponentProps['error']>,
      default: '',
    },
  },

  setup: (props, { slots }) => {
    const { label, description, error } = toRefs(props);

    const id = ref(Math.random().toString(36).slice(2, 9));
    const formBlock = ref<HTMLDivElement | null>(null);

    const normalizedDescription = computed(() => (slots.description ? slots.description() : description.value));
    const normalizedError = computed(() => (slots.error ? slots.error() : error.value));

    const defaultSlot = computed(() => slots.default?.());

    watchEffect(() => {
      const inputs = formBlock.value?.querySelectorAll('input,textarea,select') ?? [];

      const [input] = Array.from(inputs).filter((i) => !i.hasAttribute('no-focus'));

      if (input && !input.hasAttribute('id')) {
        input.setAttribute('id', id.value);
      }
    });

    return () => {
      return (
        <div class="flex w-full flex-col">
          <label for={id.value} class="m-0 block w-full text-sm font-medium leading-5 text-gray-700">
            {label.value}
          </label>

          <div class="mt-2" ref={formBlock}>
            {defaultSlot.value}
          </div>

          {normalizedDescription.value && <p class="mt-2 text-sm text-gray-500">{normalizedDescription.value}</p>}

          <Transition>
            {normalizedError.value && <p class="mt-0.5 text-sm text-red-500">{normalizedError.value}</p>}
          </Transition>
        </div>
      );
    };
  },
});
