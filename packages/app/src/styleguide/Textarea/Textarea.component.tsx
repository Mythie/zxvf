import { computed, defineComponent, PropType, toRefs, VNode } from 'vue';

export const NATIVE_INPUT_COMPONENT_SIZES = ['sm', 'md', 'lg'] as const;

export type TextareaComponentSize = typeof NATIVE_INPUT_COMPONENT_SIZES[number];

export interface TextareaComponentProps {
  id: string;
  modelValue: string;
  focusRing: boolean;
  size: TextareaComponentSize;
  rows: number;
  columns: number;
  error: string;
}

export const TextareaComponent = defineComponent({
  name: 'TextareaComponent',

  props: {
    id: {
      type: String as PropType<TextareaComponentProps['id']>,
      default: '',
    },

    modelValue: {
      type: String as PropType<TextareaComponentProps['modelValue']>,
      default: '',
    },

    focusRing: {
      type: Boolean as PropType<TextareaComponentProps['focusRing']>,
      default: true,
    },

    size: {
      type: String as PropType<TextareaComponentProps['size']>,
      default: 'md',
      validator: (value: TextareaComponentProps['size']) => NATIVE_INPUT_COMPONENT_SIZES.includes(value),
    },

    rows: {
      type: Number as PropType<TextareaComponentProps['rows']>,
      default: 4,
    },

    columns: {
      type: Number as PropType<TextareaComponentProps['columns']>,
      default: 4,
    },

    error: {
      type: String as PropType<TextareaComponentProps['error']>,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  setup: (props, { attrs, emit }) => {
    const { id, focusRing, size, rows, columns, error } = toRefs(props);

    const classes = computed(() => {
      return {
        ['w-full border m-0']: true,
        ['transition-[outline] duration-300']: true,
        ['text-sm text-gray-700 rounded-md']: true,
        ['focus:outline focus:outline-offset-[-1px] focus:outline-2 focus:outline-blue-500']: focusRing.value,
        ['py-1 px-2']: size.value === 'sm',
        ['py-2 px-3']: size.value === 'md',
        ['py-3 px-5']: size.value === 'lg',
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
      <div class="flex w-full flex-col">
        <textarea
          id={id.value || undefined}
          class={classes.value}
          v-model={modelValue.value}
          rows={rows.value}
          columns={columns.value}
          {...attrs}
        />

        {error.value && <div class="mt-2 text-xs tracking-wide text-red-600">{error.value}</div>}
      </div>
    );
  },
});
