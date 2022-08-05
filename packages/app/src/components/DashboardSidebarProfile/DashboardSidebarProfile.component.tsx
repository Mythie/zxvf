import { computed, defineComponent, PropType, toRefs } from 'vue';

import { Avatar } from '~/styleguide/Avatar';
import { Popover } from '~/styleguide/Popover';

import { User } from '~/common/types/user';

import ChevronRightIcon from '~icons/heroicons-outline/chevron-right';

export interface DashboardSidebarProfileComponentProps {
  user: User;
}

export const DashboardSidebarProfileComponent = defineComponent({
  name: 'DashboardSidebarProfileComponent',

  props: {
    user: {
      type: Object as PropType<DashboardSidebarProfileComponentProps['user']>,
      required: true,
    },
  },

  setup: (props, { slots }) => {
    const { user } = toRefs(props);

    const initials = computed(() => {
      return user.value.displayName
        ?.split(' ')
        .map((name) => name[0].toUpperCase())
        .slice(0, 2)
        .join('.');
    });

    return () => {
      const defaultSlot = slots.default ? slots.default() : null;

      return (
        <Popover placement="right-start">
          {{
            target: () => (
              <button class="flex w-full items-center gap-x-4 overflow-hidden px-3 py-3 text-left text-gray-500 outline-none ring-0 transition-colors duration-300 hover:bg-gray-50">
                <Avatar
                  class="flex-shrink-0"
                  url={user.value.photoURL}
                  alt={user.value.displayName || 'User Profile'}
                  text={user.value.photoURL ? null : initials.value}
                />

                <div class="flex flex-1 flex-col">
                  <span class="text-sm font-medium">{user.value.displayName}</span>
                  <span class="text-xs">{user.value.email}</span>
                </div>

                <ChevronRightIcon class="flex-shrink-0" />
              </button>
            ),

            content: () => <div class="flex flex-col items-center p-2">{defaultSlot}</div>,
          }}
        </Popover>
      );
    };
  },
});
