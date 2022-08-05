import { defineComponent, provide, ref, TransitionGroup } from 'vue';

import { ToastComponent } from './Toast.component';
import { ToastMessageWithId, ToastMessage, ToastPosition, ToastInject, TOAST_PROVIDER } from './Toast.types';

import './ToastProvider.styles.css';

export const ToastProviderComponent = defineComponent({
  name: 'ToastProviderComponent',

  setup: (_props, { slots }) => {
    const toasts = ref<Record<ToastPosition, ToastMessageWithId[]>>({
      'top-left': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-right': [],
    });

    const removeToast: ToastInject['removeToast'] = (id: string, position: ToastPosition) => {
      toasts.value[position] = toasts.value[position].filter((t) => t.id !== id);
    };

    const addToast: ToastInject['addToast'] = (message: ToastMessage | ToastMessageWithId) => {
      const id = 'id' in message ? message.id : Math.random().toString(36).slice(2, 9);

      const messageWithId: ToastMessageWithId = {
        ...message,
        id,
      };

      toasts.value[message.position] = [...toasts.value[message.position], messageWithId];

      if (message.duration !== -1) {
        setTimeout(() => {
          removeToast(id, message.position);
        }, message.duration);
      }
    };

    provide<ToastInject>(TOAST_PROVIDER, {
      addToast,
      removeToast,
    });

    return () => (
      <>
        {slots.default && slots.default()}

        <div class="fixed top-5 left-5 z-[9999]">
          <div class="flex w-screen max-w-xs flex-col-reverse gap-y-4">
            <TransitionGroup name="toast-provider-top-left">
              {toasts.value['top-left'].map((t) => (
                <ToastComponent
                  key={t.id}
                  id={t.id}
                  message={t.message}
                  type={t.type}
                  position={t.position}
                  duration={t.duration}
                />
              ))}
            </TransitionGroup>
          </div>
        </div>

        <div class="fixed top-5 right-5 z-[9999]">
          <div class="flex w-screen max-w-xs flex-col-reverse gap-y-4">
            <TransitionGroup name="toast-provider-top-right">
              {toasts.value['top-right'].map((t) => (
                <ToastComponent
                  key={t.id}
                  id={t.id}
                  message={t.message}
                  type={t.type}
                  position={t.position}
                  duration={t.duration}
                />
              ))}
            </TransitionGroup>
          </div>
        </div>

        <div class="fixed bottom-5 left-5 z-[9999]">
          <div class="flex w-screen max-w-xs flex-col-reverse gap-y-4">
            <TransitionGroup name="toast-provider-bottom-left">
              {toasts.value['bottom-left'].map((t) => (
                <ToastComponent
                  key={t.id}
                  id={t.id}
                  message={t.message}
                  type={t.type}
                  position={t.position}
                  duration={t.duration}
                />
              ))}
            </TransitionGroup>
          </div>
        </div>

        <div class="fixed bottom-5 right-5 z-[9999]">
          <div class="flex w-screen max-w-xs flex-col-reverse gap-y-4">
            <TransitionGroup name="toast-provider-bottom-right">
              {toasts.value['bottom-right'].map((t) => (
                <ToastComponent
                  key={t.id}
                  id={t.id}
                  message={t.message}
                  type={t.type}
                  position={t.position}
                  duration={t.duration}
                />
              ))}
            </TransitionGroup>
          </div>
        </div>
      </>
    );
  },
});
