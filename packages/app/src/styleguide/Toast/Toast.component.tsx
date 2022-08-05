import { defineComponent, inject, onBeforeMount, onUnmounted, PropType, ref, toRefs } from 'vue';

import { ToastMessageWithId, ToastInject, TOAST_PROVIDER } from './Toast.types';

import CheckIcon from '~icons/heroicons-outline/check';
import ExclamationIcon from '~icons/heroicons-outline/exclamation';
import InformationIcon from '~icons/heroicons-outline/information-circle';
import XIcon from '~icons/heroicons-outline/x';

export type ToastComponentProps = ToastMessageWithId;

export const ToastComponent = defineComponent({
  name: 'ToastComponent',

  props: {
    id: {
      type: String as PropType<ToastComponentProps['id']>,
      default: '',
    },

    message: {
      type: [String, Object] as PropType<ToastComponentProps['message']>,
      required: true,
    },

    type: {
      type: String as PropType<ToastComponentProps['type']>,
      default: 'default',
    },

    position: {
      type: String as PropType<ToastComponentProps['position']>,
      default: 'bottom-right',
    },

    duration: {
      type: Number as PropType<ToastComponentProps['duration']>,
      default: -1,
    },
  },

  setup: (props) => {
    const { id, message, type, position, duration } = toRefs(props);

    const generatedId = ref(Math.random().toString(36).slice(2, 9));

    const toast = inject<ToastInject>(TOAST_PROVIDER);

    onBeforeMount(() => {
      if (!id.value && toast) {
        toast.addToast({
          id: generatedId.value,
          message: message.value,
          type: type.value,
          position: position.value,
          duration: duration.value,
        });
      }
    });

    onUnmounted(() => {
      if (!id.value && toast) {
        toast.removeToast(generatedId.value, position.value);
      }
    });

    return () => {
      if (!id.value) {
        return null;
      }

      return (
        <div
          class="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          {type.value === 'success' && (
            <div class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-400">
              <CheckIcon class="h-5 w-5" />
              <span class="sr-only">Check icon</span>
            </div>
          )}

          {type.value === 'error' && (
            <div class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-400">
              <XIcon class="h-5 w-5" />
              <span class="sr-only">X icon</span>
            </div>
          )}

          {type.value === 'warning' && (
            <div class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-400">
              <ExclamationIcon class="h-5 w-5" />
              <span class="sr-only">Check icon</span>
            </div>
          )}

          {type.value === 'info' && (
            <div class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-400">
              <InformationIcon class="h-5 w-5" />
              <span class="sr-only">Check icon</span>
            </div>
          )}

          <div class={{ 'text-sm font-normal': true, 'ml-3': type.value !== 'default' }}>{message.value}</div>

          <button
            type="button"
            class="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Close"
            onClick={() => toast?.removeToast(id.value || generatedId.value, position.value)}
          >
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" />
          </button>
        </div>
      );
    };
  },
});
