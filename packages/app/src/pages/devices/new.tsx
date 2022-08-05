import { uuidv4 } from '@firebase/util';
import { TBaseDevice, ZBaseDevice } from '@orderdi/types';
import { defineComponent, inject, ref, VNode } from 'vue';

import { Button } from '~/styleguide/Button';
import { FormItem } from '~/styleguide/FormItem';
import { NativeInput } from '~/styleguide/NativeInput';
import { Textarea } from '~/styleguide/Textarea';
import { ToastInject, TOAST_PROVIDER, useToast } from '~/styleguide/Toast';

import { useCreateDeviceMutation } from '~/common/api/device/createDevice';
import { useFormValidator } from '~/composables/validation';
import { Dashboard } from '~/layouts/Dashboard';
import { router } from '~/router';

export const NewDevicePage = defineComponent({
  name: 'NewDevicePage',

  setup: () => {
    const $toast = useToast(inject<ToastInject>(TOAST_PROVIDER));

    const formId = ref(uuidv4());

    const device = ref<TBaseDevice>({
      name: '',
      description: '',
      passcode: '',
    });

    const validator = useFormValidator(device, ZBaseDevice);

    const vmodel = <T extends keyof TBaseDevice>(field: T) => {
      return (value: TBaseDevice[T]) => {
        device.value = { ...device.value, [field]: value };
      };
    };

    const onFormSubmit = useCreateDeviceMutation((data) => {
      router.push('/devices');
      console.log('called router');

      $toast.success(`Device "${data.name}" created successfully!`, 'bottom-right', 5000);
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

                onFormSubmit.mutate({ id: formId.value, ...device.value });
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
                  <NativeInput v-model={device.value.name} type="text" />
                </FormItem>

                <FormItem
                  class="lg:w-1/2"
                  label="Passcode"
                  description="asd"
                  error={validator.errors['price']?.message}
                >
                  <NativeInput v-model={device.value.passcode} type="password" />
                </FormItem>
              </div>

              <FormItem label="Description" description="asd" error={validator.errors['description']?.message}>
                <Textarea v-model={device.value.description} />
              </FormItem>

              <div class="flex w-full flex-row-reverse items-center justify-between">
                <Button
                  disabled={!validator.isValid || onFormSubmit.isLoading.value}
                  onMouseover={() => validator.forceTouchAll()}
                  variant="primary"
                  type="submit"
                >
                  Create Device
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

NewDevicePage.getLayout = (children: VNode) => (
  <Dashboard>
    {{
      header: () => (
        <>
          <h1 class="text-lg font-medium text-gray-700">New Device</h1>
        </>
      ),
      default: () => children,
    }}
  </Dashboard>
);

export default NewDevicePage;
