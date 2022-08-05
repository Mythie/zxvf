import { defineComponent, PropType, toRefs } from 'vue';
import Popper from 'vue3-popper';

import './Popover.styles.css';

export interface PopoverComponentProps {
  theme: 'light' | 'dark';
  placement:
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  disableClickAway: boolean;
  offsetSkid: string;
  offsetDistance: string;
  hover: boolean;
  show: boolean | null;
  disabled: boolean | null;
  openDelay: number | string;
  closeDelay: number | string;
  zIndex: number | string;
  arrow: boolean;
  arrowPadding: string;
  interactive: boolean;
  locked: boolean;
  content: string | null;
}

export const PopoverComponent = defineComponent({
  name: 'PopoverComponent',

  props: {
    content: {
      type: String as PropType<PopoverComponentProps['content']>,
      default: null,
    },

    theme: {
      type: String as PropType<PopoverComponentProps['theme']>,
      default: 'light',
    },

    placement: {
      type: String as PropType<PopoverComponentProps['placement']>,
      default: 'bottom',
    },

    disableClickAway: {
      type: Boolean as PropType<PopoverComponentProps['disableClickAway']>,
      default: false,
    },

    offsetSkid: {
      type: String as PropType<PopoverComponentProps['offsetSkid']>,
      default: '0',
    },

    offsetDistance: {
      type: String as PropType<PopoverComponentProps['offsetDistance']>,
      default: '12',
    },

    hover: {
      type: Boolean as PropType<PopoverComponentProps['hover']>,
      default: false,
    },

    show: {
      type: Boolean as PropType<PopoverComponentProps['show']>,
      default: null,
    },

    disabled: {
      type: [Boolean, Object] as PropType<PopoverComponentProps['disabled']>,
      default: null,
    },

    openDelay: {
      type: [Number, String] as PropType<PopoverComponentProps['openDelay']>,
      default: 0,
    },

    closeDelay: {
      type: [Number, String] as PropType<PopoverComponentProps['closeDelay']>,
      default: 0,
    },

    zIndex: {
      type: [Number, String] as PropType<PopoverComponentProps['zIndex']>,
      default: 9999,
    },

    arrow: {
      type: Boolean as PropType<PopoverComponentProps['arrow']>,
      default: true,
    },

    arrowPadding: {
      type: String as PropType<PopoverComponentProps['arrowPadding']>,
      default: '0',
    },

    interactive: {
      type: Boolean as PropType<PopoverComponentProps['interactive']>,
      default: true,
    },

    locked: {
      type: Boolean as PropType<PopoverComponentProps['locked']>,
      default: false,
    },
  },

  emits: ['open:popper', 'close:popper'],

  setup: (props, { slots }) => {
    const {
      theme,
      content,
      placement,
      disableClickAway,
      offsetSkid,
      offsetDistance,
      hover,
      show,
      disabled,
      openDelay,
      closeDelay,
      zIndex,
      arrow,
      arrowPadding,
      interactive,
      locked,
    } = toRefs(props);

    return () => {
      const slotTarget = slots.target?.() || null;
      const slotContent = slots.content ? slots.content() : <div>{content.value}</div>;

      return (
        <Popper
          class={`popover-component w-full ${theme.value}`}
          placement={placement.value}
          disableClickAway={disableClickAway.value}
          offsetSkid={offsetSkid.value}
          offsetDistance={offsetDistance.value}
          hover={hover.value}
          show={show.value ?? undefined}
          disabled={disabled.value ?? undefined}
          openDelay={openDelay.value}
          closeDelay={closeDelay.value}
          zIndex={zIndex.value}
          arrow={arrow.value}
          arrowPadding={arrowPadding.value}
          interactive={interactive.value}
          locked={locked.value}
        >
          {{
            default: () => slotTarget,
            content: () => slotContent,
          }}
        </Popper>
      );
    };
  },
});
