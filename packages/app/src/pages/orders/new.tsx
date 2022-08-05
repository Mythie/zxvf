import { uuidv4 } from '@firebase/util';
import { TBaseProductGroup, ZBaseProductGroup } from '@orderdi/types';
import { defineComponent, inject, ref, VNode } from 'vue';

import { Button } from '~/styleguide/Button';
import { FormItem } from '~/styleguide/FormItem';
import { NativeInput } from '~/styleguide/NativeInput';
import { Textarea } from '~/styleguide/Textarea';
import { ToastInject, TOAST_PROVIDER, useToast } from '~/styleguide/Toast';

import { useCreateProductGroupMutation } from '~/common/api/productGroup/createProductGroup';
import { useFormValidator } from '~/composables/validation';
import { Dashboard } from '~/layouts/Dashboard';
import { router } from '~/router';

export const NewProductGroupPage = defineComponent({
  name: 'NewProductGroupPage',

  setup: () => {
    const $toast = useToast(inject<ToastInject>(TOAST_PROVIDER));

    const formId = ref(uuidv4());

    const product = ref<TBaseProductGroup>({
      name: '',
      description: '',
      price: 0,
      ingredients: [],
      modifications: [],
      images: [],
      group: null,
    });

    const validator = useFormValidator(product, ZBaseProductGroup);

    const vmodel = <T extends keyof TBaseProductGroup>(field: T) => {
      return (value: TBaseProductGroup[T]) => {
        product.value = { ...product.value, [field]: value };
      };
    };

    const onFormSubmit = useCreateProductGroupMutation((data) => {
      router.push('/product-groups');
      console.log('called router');

      $toast.success(`Product Group "${data.name}" created successfully!`, 'bottom-right', 5000);
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

                onFormSubmit.mutate(product.value);
              }}
              onKeydown={onFormKeydown}
            >
              <FormItem
                label="Name"
                description="Lorem ipsum dolor amut blah blah"
                error={validator.errors['name']?.message}
              >
                <NativeInput modelValue={product.value.name} onUpdate:modelValue={vmodel('name')} type="text" />
              </FormItem>

              <FormItem label="Description" description="asd" error={validator.errors['description']?.message}>
                <Textarea v-model={product.value.description} />
              </FormItem>

              <div class="flex w-full flex-row-reverse items-center justify-between">
                <Button
                  disabled={!validator.isValid || onFormSubmit.isLoading.value}
                  onMouseover={() => validator.forceTouchAll()}
                  variant="primary"
                  type="submit"
                >
                  Create Product Group
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

NewProductGroupPage.getLayout = (children: VNode) => (
  <Dashboard>
    {{
      header: () => (
        <>
          <h1 class="text-lg font-medium text-gray-700">New ProductGroup</h1>
        </>
      ),
      default: () => children,
    }}
  </Dashboard>
);

export default NewProductGroupPage;
