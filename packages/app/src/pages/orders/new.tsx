import { uuidv4 } from '@firebase/util';
import { TBaseOrder, ZBaseOrder } from '@orderdi/types';
import { defineComponent, inject, ref, VNode } from 'vue';

import { Button } from '~/styleguide/Button';
import { FormItem } from '~/styleguide/FormItem';
import { NativeInput } from '~/styleguide/NativeInput';
import { Textarea } from '~/styleguide/Textarea';
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
      name: '',
      description: '',
      passcode: '',
    });

    const validator = useFormValidator(order, ZBaseOrder);

    const vmodel = <T extends keyof TBaseOrder>(field: T) => {
      return (value: TBaseOrder[T]) => {
        order.value = { ...order.value, [field]: value };
      };
    };

    const onFormSubmit = useCreateOrderMutation((data) => {
      router.push('/orders');
      console.log('called router');

      $toast.success(`Order "${data.name}" created successfully!`, 'bottom-right', 5000);
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
              <div class="flex w-full flex-col gap-y-6 lg:flex-row lg:items-center lg:gap-x-6">
                <FormItem
                  class="lg:w-1/2"
                  label="Name"
                  description="Lorem ipsum dolor amut blah blah"
                  error={validator.errors['name']?.message}
                >
                  <NativeInput v-model={order.value.name} type="text" />
                </FormItem>

                <FormItem
                  class="lg:w-1/2"
                  label="Passcode"
                  description="asd"
                  error={validator.errors['price']?.message}
                >
                  <NativeInput v-model={order.value.passcode} type="password" />
                </FormItem>
              </div>

              <FormItem label="Description" description="asd" error={validator.errors['description']?.message}>
                <Textarea v-model={order.value.description} />
              </FormItem>

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
