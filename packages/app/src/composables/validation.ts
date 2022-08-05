import { computed, reactive, readonly, Ref, watch } from 'vue';
import { ZodIssue, ZodObject, ZodRawShape } from 'zod';

export const useFormValidator = <T extends Record<string, unknown>, U extends ZodRawShape>(
  form: Ref<T>,
  model: ZodObject<U>,
) => {
  const keys = Object.keys(form.value) as Array<keyof T>;

  const valid = computed(() => model.safeParse(form.value));

  const fields = reactive<Record<keyof T | string, boolean>>(
    keys.reduce((acc, key) => {
      acc[key] = false;

      return acc;
    }, {} as Record<keyof T | string, boolean>),
  );

  const errors = computed(() => {
    const e = {} as Record<string, ZodIssue>;

    if (valid.value && 'error' in valid.value) {
      return valid.value.error.issues.reduce((acc, issue) => {
        const key: string = issue.path.join('.');

        if (fields && key in fields && fields[key]) {
          acc[key] = issue;
        }

        return acc;
      }, e);
    }

    return e;
  });

  const isTouched = computed(() => Object.values(fields).some((v) => v === true));

  const isValid = computed(() => valid.value.success);

  const forceTouch = (key: keyof T) => {
    Object.assign(fields, { [key]: true });
  };

  const forceTouchAll = () => {
    const keys = Object.keys(fields) as Array<keyof T>;

    keys.forEach((key) => {
      forceTouch(key);
    });
  };

  const unwatch = watch(
    form,
    (newValue, oldValue) => {
      Object.keys(newValue).forEach((key) => {
        if (newValue[key] !== oldValue[key] && !fields[key]) {
          // Handles an issue with the type for $touched
          forceTouch(key);
        }
      });

      if (Object.values(fields).every((value) => value === true)) {
        unwatch();
      }
    },
    { deep: true },
  );

  return readonly(
    reactive({
      fields,
      isTouched,
      forceTouch,
      forceTouchAll,
      valid,
      errors,
      isValid,
    }),
  );
};
