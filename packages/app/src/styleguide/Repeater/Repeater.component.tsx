/* eslint-disable vue/one-component-per-file */
import { defineComponent, Component, PropType } from 'vue';

type ModelValueOf<T> = T extends Component<{ modelValue: infer U }> ? U : never;

export interface RepeaterComponentProps<T extends Component<{ modelValue: any }> = any, P = ModelValueOf<T>> {
  as: T;
  modelValue: P[];
}

export const useRepeaterComponent = <T extends Component<{ modelValue: any }>>() =>
  defineComponent({
    name: 'RepeaterComponent',

    props: {
      as: {
        type: Object as PropType<RepeaterComponentProps<T>['as']>,
        required: true,
      },

      modelValue: {
        type: Array as PropType<RepeaterComponentProps<T>['modelValue']>,
        default: [] as unknown[],
      },
    },

    setup: (_props, { attrs }) => {
      return () => <div {...attrs}></div>;
    },
  });

export const RepeaterComponent = useRepeaterComponent();
