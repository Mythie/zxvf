import { computed, defineComponent, inject, PropType, ref, toRefs, TransitionGroup } from 'vue';

import { ToastInject, TOAST_PROVIDER, useToast } from '../Toast';

import { bytesToMb, isAcceptedFile } from './Dropzone.helper';

import DocumentIcon from '~icons/heroicons-outline/document';
import XIcon from '~icons/heroicons-outline/x';

import './Dropzone.styles.css';

export const DROPZONE_COMPONENT_SIZES = ['sm', 'md', 'lg'] as const;

export type DropzoneComponentSize = typeof DROPZONE_COMPONENT_SIZES[number];

export interface DropzoneComponentProps {
  id: string;
  size: DropzoneComponentSize;
  modelValue: string[];
  block: boolean;
  error: string;
  accept: string[];
  multiple: boolean;
  maxFiles: number;
  maxSize: number;
  onFileUpload: (_file: File) => string | Promise<string>;
  onFileRemove: (_file: string) => void | Promise<void>;
}

export const DropzoneComponent = defineComponent({
  name: 'DropzoneComponent',

  props: {
    id: {
      type: String as PropType<DropzoneComponentProps['id']>,
      default: '',
    },

    size: {
      type: String as PropType<DropzoneComponentProps['size']>,
      default: 'md',
      validator: (value: DropzoneComponentProps['size']) => DROPZONE_COMPONENT_SIZES.includes(value),
    },

    modelValue: {
      type: Array as PropType<DropzoneComponentProps['modelValue']>,
      default: [] as string[],
    },

    block: {
      type: Boolean as PropType<DropzoneComponentProps['block']>,
      default: true,
    },

    error: {
      type: String as PropType<DropzoneComponentProps['error']>,
      default: '',
    },

    accept: {
      type: Array as PropType<DropzoneComponentProps['accept']>,
      default: [] as string[],
    },

    multiple: {
      type: Boolean as PropType<DropzoneComponentProps['multiple']>,
      default: true,
    },

    maxFiles: {
      type: Number as PropType<DropzoneComponentProps['maxFiles']>,
      default: -1,
    },

    maxSize: {
      type: Number as PropType<DropzoneComponentProps['maxSize']>,
      default: -1,
    },

    onFileUpload: {
      type: Function as PropType<DropzoneComponentProps['onFileUpload']>,
      required: true,
    },

    onFileRemove: {
      type: Function as PropType<DropzoneComponentProps['onFileRemove']>,
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, { emit, attrs }) => {
    const { id, size, block, error, accept, multiple, maxFiles, maxSize, onFileUpload, onFileRemove } = toRefs(props);

    const loading = ref(false);

    const $toast = useToast(inject<ToastInject>(TOAST_PROVIDER));

    const modelValue = computed({
      get: () => props.modelValue,
      set: (value: string[]) => {
        emit('update:modelValue', value);
      },
    });

    const remainingFiles = computed(() => {
      if (maxFiles.value === -1) {
        return -1;
      }

      return maxFiles.value - modelValue.value.length;
    });

    const input = ref<HTMLInputElement | null>(null);

    const classes = computed(() => ({
      'w-full': block.value,
      'flex flex-col items-center': true,
      'transition-[border] duration-300': true,
      'rounded-md border-2 border-dashed hover:border-gray-400': true,
      'cursor-pointer': true,
      'p-3': size.value === 'sm',
      'p-5': size.value === 'md',
      'p-12': size.value === 'lg',
    }));

    const validateAndUploadFiles = async (files: File[]) => {
      try {
        loading.value = true;

        const err = files.some((f) => {
          if (bytesToMb(f.size) > maxSize.value && maxSize.value !== -1) {
            $toast.warning(`File ${f.name} is too big. Max file size is ${maxSize.value.toFixed(2)}MB`);
            return true;
          }

          if (!isAcceptedFile(f, accept.value)) {
            $toast.warning(`File ${f.name} is not accepted. Accepted file types include: ${accept.value.join(', ')}.`);
            return true;
          }

          return false;
        });

        if (err) {
          loading.value = false;

          $toast.error('One or more files encountered errors. Please review and try again.');
          return;
        }

        const paths = await Promise.all(files.map((f) => onFileUpload.value(f)));

        modelValue.value = multiple.value ? [...modelValue.value, ...paths] : [paths[0]];
      } catch (err) {
        console.error(err.message);

        $toast.error('An error occurred while uploading files. Please try again.');

        loading.value = false;
      }
    };

    const handleDropzoneClick = (_e: MouseEvent) => {
      if (input.value) {
        input.value.click();
      }
    };

    const handleDropzoneDrop = async (e: DragEvent) => {
      e.preventDefault();

      if (e.dataTransfer) {
        const files = Array.from(e.dataTransfer.files);

        if (files.length > remainingFiles.value && remainingFiles.value !== -1) {
          $toast.warning(`You can only upload ${remainingFiles.value} files at a time.`);
          return;
        }

        if (files.length > 0) {
          validateAndUploadFiles(files);
        }
      }
    };

    const handleDropzoneDragover = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.files) {
        const files = Array.from(target.files);

        if (files.length > remainingFiles.value && remainingFiles.value !== -1) {
          $toast.warning(`You can only upload ${remainingFiles.value} files at a time.`);
          return;
        }

        if (files.length > 0) {
          validateAndUploadFiles(files);
        }
      }

      target.value = '';
    };

    const handleRemove = async (file: string, index: number) => {
      await onFileRemove.value(file);

      modelValue.value = modelValue.value.filter((_, i) => i !== index);
    };

    return () => (
      <div>
        <div class="mb-3 flex w-full flex-wrap gap-4">
          <TransitionGroup name="dropzone">
            {modelValue.value.map((value, index) => {
              const url = new URL(value, window.location.origin);

              const split = url.pathname.split('.');

              const ext = split.length > 1 ? split[split.length - 1] : '';

              const isImage = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext);

              return (
                <div class="group relative rounded-md transition-shadow duration-300 hover:shadow-md" key={`${value}`}>
                  <div class="relative">
                    <div
                      class="pointer-events-none absolute top-0 right-0 z-20 m-1 rounded bg-red-100 p-1 text-xs text-red-500 opacity-0 transition-all duration-300 hover:bg-red-200 group-hover:pointer-events-auto group-hover:opacity-100"
                      role={'button'}
                      onClick={() => handleRemove(value, index)}
                    >
                      <XIcon />
                    </div>

                    <div class="relative h-40 w-40">
                      <div class="absolute inset-0 z-10 flex items-center justify-center rounded bg-gray-200 text-3xl text-gray-400">
                        {ext ? `.${ext}`.toUpperCase() : <DocumentIcon />}
                      </div>

                      {isImage && (
                        <img src={url.toString()} class="absolute inset-0 z-10 h-full w-full rounded object-contain" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </TransitionGroup>
        </div>

        <div
          class={classes.value}
          onClick={handleDropzoneClick}
          onDrop={handleDropzoneDrop}
          onDragover={handleDropzoneDragover}
          {...attrs}
        >
          <div class="flex flex-col text-center text-gray-400">
            <span class="text-sm">Click or drag files to upload</span>

            <span class="mt-1 text-xs">
              Files remaining: {maxFiles.value === -1 ? 'Unlimited' : remainingFiles.value}
            </span>

            {accept.value.length > 0 && <span class="text-xs">Accepted file types: {accept.value.join(', ')}</span>}

            <span class="text-xs">
              Max file size: {maxSize.value === -1 ? 'Unlimited' : `${maxSize.value.toFixed(2)} MB`}
            </span>
          </div>

          <input
            id={id.value}
            ref={input}
            multiple={multiple.value}
            accept={accept.value.join(',')}
            max={remainingFiles.value === -1 ? undefined : remainingFiles.value}
            class="hidden"
            type="file"
            onInput={handleChange}
            no-focus
          />
        </div>

        {error.value && <div class="mt-2 text-xs tracking-wide text-red-600">{error.value}</div>}
      </div>
    );
  },
});
