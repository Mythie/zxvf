import { uuidv4 } from '@firebase/util';
import { TBaseDevice, TDeviceType, ZBaseDevice } from '@orderdi/types';
import { getRandomId } from '@orderdi/util';
import { defineComponent, inject, reactive, ref, VNode } from 'vue';

import { Button } from '~/styleguide/Button';
import { FormItem } from '~/styleguide/FormItem';
import { NativeInput } from '~/styleguide/NativeInput';
import { NativeSelect } from '~/styleguide/NativeSelect';
import { Textarea } from '~/styleguide/Textarea';
import { ToastInject, TOAST_PROVIDER, useToast } from '~/styleguide/Toast';

import { useCreateDeviceMutation } from '~/common/api/device/createDevice';
import { useFormValidator } from '~/composables/validation';
import { useVModelRef } from '~/composables/vmodel';
import { Dashboard } from '~/layouts/Dashboard';
import { router } from '~/router';

import RefreshIcon from '~icons/heroicons-outline/refresh';

const DEVICE_TYPE_OPTIONS: Array<{ label: string; value: TDeviceType }> = [
  {
    label: 'Point of Sale System',
    value: 'pos',
  },
  {
    label: 'Order Tracking Display',
    value: 'order-tracker',
  },
];

export const NewDevicePage = defineComponent({
  name: 'NewDevicePage',

  setup: () => {
    const $toast = useToast(inject<ToastInject>(TOAST_PROVIDER));

    const formId = ref(uuidv4());

    const device = ref<TBaseDevice>({
      name: '',
      description: '',
      passcode: '',
      type: 'pos',
    });

    const validator = useFormValidator(device, ZBaseDevice);

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

    const onGenerateNameClick = () => {
      device.value.name = getRandomId();
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
              <div class="flex w-full flex-col gap-y-6 lg:flex-row lg:items-start lg:gap-x-6">
                <FormItem
                  class="lg:w-1/2"
                  label="Name"
                  description="Lorem ipsum dolor amut blah blah"
                  error={validator.errors['name']?.message}
                >
                  <NativeInput
                    {...useVModelRef(device, 'name')}
                    type="text"
                    role="note"
                    allowLeftIconClick
                    leftIcon={
                      <button
                        type="button"
                        class="cursor-pointer hover:text-blue-400"
                        onClick={onGenerateNameClick}
                        title={'Generate random name'}
                      >
                        <RefreshIcon />
                      </button>
                    }
                  />
                </FormItem>

                <FormItem
                  class="lg:w-1/2"
                  label="Passcode"
                  description="asd"
                  error={validator.errors['passcode']?.message}
                >
                  <NativeInput {...useVModelRef(device, 'passcode')} type="password" />
                </FormItem>
              </div>

              <FormItem label="Device Type" description="asd" error={validator.errors['type']?.message}>
                <NativeSelect {...useVModelRef(device, 'type')} options={DEVICE_TYPE_OPTIONS} />
              </FormItem>

              <FormItem label="Description" description="asd" error={validator.errors['description']?.message}>
                <Textarea {...useVModelRef(device, 'description')} />
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
