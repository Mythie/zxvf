import { uuidv4 } from '@firebase/util';
import { TBaseOrder, ZBaseOrder } from '@orderdi/types';
import { defineComponent, inject, ref, VNode } from 'vue';

import { Button } from '~/styleguide/Button';
import { ToastInject, TOAST_PROVIDER, useToast } from '~/styleguide/Toast';

import { useCreateOrderMutation } from '~/common/api/order/createOrder';
import { useFormValidator } from '~/composables/validation';
import { Dashboard } from '~/layouts/Dashboard';
import { router } from '~/router';

export const NewOrderPage = defineComponent({
  name: 'NewOrderPage',

  setup: () => {
    const $toast = useToast(inject<ToastInject>(TOAST_PROVIDER));

    const formId = ref(uuidv4());

    const order = ref<TBaseOrder>({
      price: 0,
      discount: 0,
      tax: 0,
      products: [],
      paymentMethod: 'unknown',
    });

    const validator = useFormValidator(order, ZBaseOrder);

    const onFormSubmit = useCreateOrderMutation((_data) => {
      router.push('/orders');
      console.log('called router');

      $toast.success(`Order created successfully!`, 'bottom-right', 5000);
    });

    const onFormKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.ctrlKey) {
        event.preventDefault();
      }
    };

    return () => {
      return (
        <main class="mx-auto flex flex-col items-center justify-center font-sans leading-loose">
          <div class="w-full">
            <form
              class="flex flex-col items-center gap-y-6"
              onSubmit={(e) => {
                e.preventDefault();

                $toast.info('Saving...', 'bottom-right', 5000);

                onFormSubmit.mutate({ id: formId.value, ...order.value });
              }}
              onKeydown={onFormKeydown}
            >
              <div class="flex w-full flex-row-reverse items-center justify-between">
                <Button
                  disabled={!validator.isValid || onFormSubmit.isLoading.value}
                  onMouseover={() => validator.forceTouchAll()}
                  variant="primary"
                  type="submit"
                >
                  Create Order
                </Button>
              </div>
            </form>
          </div>
          {/* <Card>
          </Card> */}
        </main>
      );
    };
  },
});

NewOrderPage.getLayout = (children: VNode) => (
  <Dashboard>
    {{
      header: () => (
        <>
          <h1 class="text-lg font-medium text-gray-700">New Order</h1>
        </>
      ),
      default: () => children,
    }}
  </Dashboard>
);

export default NewOrderPage;
