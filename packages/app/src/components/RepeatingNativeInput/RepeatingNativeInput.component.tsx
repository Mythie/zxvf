import { computed, defineComponent, PropType, toRefs } from 'vue';

import { Button } from '~/styleguide/Button';
import {
  NativeInputComponent,
  NativeInputComponentProps,
  NATIVE_INPUT_COMPONENT_SIZES,
} from '~/styleguide/NativeInput';

import './RepeatingNativeInput.styles.css';

export interface RepeatingNativeInputComponentProps extends Omit<NativeInputComponentProps, 'modelValue'> {
  modelValue: string[];
}

export const RepeatingNativeInputComponent = defineComponent({
  name: 'RepeatingNativeInputComponent',

  props: {
    id: {
      type: String as PropType<RepeatingNativeInputComponentProps['id']>,
      default: '',
    },

    modelValue: {
      type: Array as PropType<RepeatingNativeInputComponentProps['modelValue']>,
      default: [] as string[],
    },

    focusRing: {
      type: Boolean as PropType<RepeatingNativeInputComponentProps['focusRing']>,
      default: true,
    },

    size: {
      type: String as PropType<RepeatingNativeInputComponentProps['size']>,
      default: 'md',
      validator: (value: RepeatingNativeInputComponentProps['size']) => NATIVE_INPUT_COMPONENT_SIZES.includes(value),
    },

    type: {
      type: String as PropType<RepeatingNativeInputComponentProps['type']>,
      default: 'text',
    },

    error: {
      type: String as PropType<RepeatingNativeInputComponentProps['error']>,
      default: '',
    },

    leftIcon: {
      type: Object as PropType<RepeatingNativeInputComponentProps['leftIcon']>,
      default: null,
    },

    rightIcon: {
      type: Object as PropType<RepeatingNativeInputComponentProps['rightIcon']>,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, { emit }) => {
    const { id, focusRing, size, type, error, leftIcon, rightIcon } = toRefs(props);

    const modelValue = computed({
      get: () => props.modelValue,
      set: (value: string[]) => {
        console.log('updating:modelValue', value);
        emit('update:modelValue', value);
      },
    });

    const handleUpdateItem = (value: string, index: number) => {
      const newValue = [...modelValue.value];

      newValue[index] = value;

      modelValue.value = newValue;
    };

    const handleAddItem = () => {
      modelValue.value = [...modelValue.value, ''];
    };

    const handleRemoveItem = (index: number) => {
      console.log('removing', index);
      const value = [...modelValue.value];

      value.splice(index, 1);

      console.log(JSON.parse(JSON.stringify({ modelValue: modelValue.value, value })));

      modelValue.value = value;
    };

    return () => {
      return (
        <div class="flex w-full flex-col gap-y-3">
          {modelValue.value.map((value, index) => {
            return (
              <div class="flex w-full flex-nowrap items-center gap-x-4" key={`${id}-${index}`}>
                <NativeInputComponent
                  class="flex-1"
                  id={`${id}-${index}`}
                  modelValue={value}
                  focusRing={focusRing.value}
                  size={size.value}
                  type={type.value}
                  error={error.value}
                  leftIcon={leftIcon.value}
                  rightIcon={rightIcon.value}
                  onUpdate:modelValue={(value: string) => handleUpdateItem(value, index)}
                />

                <Button variant={'text'} size={'sm'} onClick={() => handleRemoveItem(index)} class="text-red-500">
                  Remove
                </Button>
              </div>
            );
          })}

          {modelValue.value.length === 0 && <div class="text-sm text-gray-500">There are currently no items...</div>}

          <div class="flex w-full flex-row justify-between">
            <Button variant={'secondary'} onClick={() => handleAddItem()}>
              Add Item
            </Button>
          </div>
        </div>
      );
    };
  },
});
