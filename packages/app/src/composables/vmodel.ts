import { Ref } from 'vue';

export const useVModelRef = <T extends Record<string, unknown>, K extends keyof T>(
  form: Ref<T>,
  key: K,
  prop = 'modelValue',
) => {
  return {
    [prop]: form.value[key],

    [`onUpdate:${prop}`]: (value: T[K]) => {
      form.value = { ...form.value, [key]: value };
    },
  };
};
