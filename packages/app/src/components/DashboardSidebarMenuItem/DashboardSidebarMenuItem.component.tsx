import { computed, defineComponent, FunctionalComponent, PropType, toRefs } from 'vue';
import { RouterLink } from 'vue-router';

import { TailwindColor } from '~/common/types/color';

export interface DashboardSidebarMenuItemComponentProps {
  label: string;
  icon: FunctionalComponent | null;
  to: string;
  color: TailwindColor;
}

export const DashboardSidebarMenuItemComponent = defineComponent({
  name: 'DashboardSidebarMenuItemComponent',

  props: {
    label: {
      type: String as PropType<DashboardSidebarMenuItemComponentProps['label']>,
      required: true,
    },

    icon: {
      type: Object as PropType<DashboardSidebarMenuItemComponentProps['icon']>,
      default: null,
    },

    to: {
      type: String as PropType<DashboardSidebarMenuItemComponentProps['to']>,
      required: true,
    },

    color: {
      type: String as PropType<DashboardSidebarMenuItemComponentProps['color']>,
      default: 'blue',
    },
  },

  setup: (props, { slots }) => {
    const { label, icon, to, color } = toRefs(props);

    const isSameDomain = computed(() => {
      const url = new URL(to.value, window.location.origin);

      return url.host === window.location.host;
    });

    const linkClasses = computed(() => ({
      'flex items-center gap-x-4 rounded px-5 h-14 transition-colors duration-300': true,
      'text-gray-400 hover:bg-gray-100': color.value === 'gray',
      'text-red-400 hover:bg-red-100': color.value === 'red',
      'text-orange-400 hover:bg-orange-100': color.value === 'orange',
      'text-amber-400 hover:bg-amber-100': color.value === 'amber',
      'text-yellow-400 hover:bg-yellow-100': color.value === 'yellow',
      'text-lime-400 hover:bg-lime-100': color.value === 'lime',
      'text-green-400 hover:bg-green-100': color.value === 'green',
      'text-emerald-400 hover:bg-emerald-100': color.value === 'emerald',
      'text-teal-400 hover:bg-teal-100': color.value === 'teal',
      'text-cyan-400 hover:bg-cyan-100': color.value === 'cyan',
      'text-sky-400 hover:bg-sky-100': color.value === 'sky',
      'text-blue-400 hover:bg-blue-100': color.value === 'blue',
      'text-indigo-400 hover:bg-indigo-100': color.value === 'indigo',
      'text-violet-400 hover:bg-violet-100': color.value === 'violet',
      'text-purple-400 hover:bg-purple-100': color.value === 'purple',
      'text-fuchsia-400 hover:bg-fuchsia-100': color.value === 'fuchsia',
      'text-pink-400 hover:bg-pink-100': color.value === 'pink',
      'text-rose-400 hover:bg-rose-100': color.value === 'rose',
    }));

    const iconClasses = computed(() => ({
      'text-lg p-2 rounded': true,
      'bg-gray-100 hover:bg-gray-100': color.value === 'gray',
      'bg-red-100 hover:bg-red-100': color.value === 'red',
      'bg-orange-100 hover:bg-orange-100': color.value === 'orange',
      'bg-amber-100 hover:bg-amber-100': color.value === 'amber',
      'bg-yellow-100 hover:bg-yellow-100': color.value === 'yellow',
      'bg-lime-100 hover:bg-lime-100': color.value === 'lime',
      'bg-green-100 hover:bg-green-100': color.value === 'green',
      'bg-emerald-100 hover:bg-emerald-100': color.value === 'emerald',
      'bg-teal-100 hover:bg-teal-100': color.value === 'teal',
      'bg-cyan-100 hover:bg-cyan-100': color.value === 'cyan',
      'bg-sky-100 hover:bg-sky-100': color.value === 'sky',
      'bg-blue-100 hover:bg-blue-100': color.value === 'blue',
      'bg-indigo-100 hover:bg-indigo-100': color.value === 'indigo',
      'bg-violet-100 hover:bg-violet-100': color.value === 'violet',
      'bg-purple-100 hover:bg-purple-100': color.value === 'purple',
      'bg-fuchsia-100 hover:bg-fuchsia-100': color.value === 'fuchsia',
      'bg-pink-100 hover:bg-pink-100': color.value === 'pink',
      'bg-rose-100 hover:bg-rose-100': color.value === 'rose',
    }));

    return () => {
      if (isSameDomain.value) {
        return (
          <RouterLink to={to.value} class={linkClasses.value}>
            {slots.icon && <span class={iconClasses.value}>{slots.icon()}</span>}

            {icon.value && (
              <span class={iconClasses.value}>
                <icon.value />
              </span>
            )}

            <span class="text-sm font-semibold">{label.value}</span>
          </RouterLink>
        );
      }

      return (
        <a
          href={to.value}
          target="_blank"
          class="flex gap-x-2 rounded bg-gray-50 px-5 py-5 transition-colors duration-300 hover:bg-gray-100"
        >
          {slots.icon && <span>{slots.icon()}</span>}

          {icon.value && <span>{icon.value}</span>}

          <span class="text-sm font-semibold">{label.value}</span>
        </a>
      );
    };
  },
});
