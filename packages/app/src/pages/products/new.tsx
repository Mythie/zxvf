import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from '@firebase/storage';
import { uuidv4 } from '@firebase/util';
import { TBaseProduct, ZBaseProduct } from '@orderdi/types';
import { defineComponent, inject, ref, VNode } from 'vue';

import { Button } from '~/styleguide/Button';
import { Dropzone } from '~/styleguide/Dropzone';
import { FormItem } from '~/styleguide/FormItem';
import { NativeInput } from '~/styleguide/NativeInput';
import { Textarea } from '~/styleguide/Textarea';
import { ToastInject, TOAST_PROVIDER, useToast } from '~/styleguide/Toast';

import { useCreateProductMutation } from '~/common/api/product/createProduct';
import { RepeatingNativeInput } from '~/components/RepeatingNativeInput';
import { useIsAuthenticated } from '~/composables/authentication';
import { useStorage } from '~/composables/firebase';
import { useFormValidator } from '~/composables/validation';
import { Dashboard } from '~/layouts/Dashboard';
import { router } from '~/router';

export const NewProductPage = defineComponent({
  name: 'NewProductPage',

  setup: () => {
    const $toast = useToast(inject<ToastInject>(TOAST_PROVIDER));

    const formId = ref(uuidv4());

    const product = ref<TBaseProduct>({
      name: '',
      description: '',
      price: 0,
      ingredients: [],
      modifications: [],
      images: [],
      group: null,
    });

    const validator = useFormValidator(product, ZBaseProduct);

    const vmodel = <T extends keyof TBaseProduct>(field: T) => {
      return (value: TBaseProduct[T]) => {
        product.value = { ...product.value, [field]: value };
      };
    };

    const onImageUpload = async (file: File): Promise<string> => {
      const storage = useStorage();
      const authenticated = useIsAuthenticated();

      if (!authenticated.user) {
        throw new Error('User is not authenticated');
      }

      const filePath = `uploads/product/${authenticated.user.uid}/${formId.value}/${file.name}`;

      const fileRef = storageRef(storage, filePath);

      const result = await uploadBytes(fileRef, await file.arrayBuffer());

      return getDownloadURL(result.ref);
    };

    const onImageRemove = async (path: string): Promise<void> => {
      const storage = useStorage();

      const fileRef = storageRef(storage, path);

      return deleteObject(fileRef);
    };

    const onFormSubmit = useCreateProductMutation((data) => {
      router.push('/products');
      console.log('called router');

      $toast.success(`Product "${data.name}" created successfully!`, 'bottom-right', 5000);
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

                onFormSubmit.mutate({ id: formId.value, ...product.value });
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
                  <NativeInput modelValue={product.value.name} onUpdate:modelValue={vmodel('name')} type="text" />
                </FormItem>

                <FormItem class="lg:w-1/2" label="Price" description="asd" error={validator.errors['price']?.message}>
                  <NativeInput v-model={product.value.price} type="number" leftIcon={<span>$</span>} />
                </FormItem>
              </div>

              <FormItem label="Description" description="asd" error={validator.errors['description']?.message}>
                <Textarea v-model={product.value.description} />
              </FormItem>

              <FormItem label="Ingredients" description="asd" error={validator.errors['ingredients']?.message}>
                <RepeatingNativeInput v-model={product.value.ingredients} type="text" />
              </FormItem>

              <FormItem label="Modifications" description="asd" error={validator.errors['modifications']?.message}>
                <RepeatingNativeInput v-model={product.value.modifications} type="text" />
              </FormItem>

              <FormItem label="Images" description="asd" error={validator.errors['images']?.message}>
                <Dropzone v-model={product.value.images} onFileUpload={onImageUpload} onFileRemove={onImageRemove} />
              </FormItem>

              <div class="flex w-full flex-row-reverse items-center justify-between">
                <Button
                  disabled={!validator.isValid || onFormSubmit.isLoading.value}
                  onMouseover={() => validator.forceTouchAll()}
                  variant="primary"
                  type="submit"
                >
                  Create Product
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

NewProductPage.getLayout = (children: VNode) => (
  <Dashboard>
    {{
      header: () => (
        <>
          <h1 class="text-lg font-medium text-gray-700">New Product</h1>
        </>
      ),
      default: () => children,
    }}
  </Dashboard>
);

export default NewProductPage;
