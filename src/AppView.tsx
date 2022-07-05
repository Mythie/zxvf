import { defineComponent, h, VNode } from 'vue';
import { RouterView } from 'vue-router';

/**
 * Augments the `VNode` type allowing for the definition of a `getLayout` method
 */
export type VNodeWithLayout = VNode & {
  type: VNode['type'] & {
    getLayout: (_children: VNode) => VNode;
  };
};

/**
 * Determines if a given VNode has a `getLayout` method defined on a component's
 * public instance where a component is available.
 */
const isVNodeWithLayout = (node: VNode | VNodeWithLayout): node is VNodeWithLayout => {
  if (!node) {
    return false;
  }

  return typeof node.type === 'object' && 'getLayout' in node.type && typeof node.type.getLayout === 'function';
};

/**
 * AppView provides a wrapper around <RouterView /> allowing for the usage
 * of component level layouts.
 *
 * This was inspired by layouts in NextJS and avoids flashes of protected content
 * when navigating between pages.
 */
export const AppView = defineComponent({
  name: 'AppView',

  setup(_props, { attrs }) {
    return () => (
      <RouterView>
        {{
          default: ({ Component }: { Component: VNode }) => {
            if (!Component) {
              return <div />;
            }

            // If the component comes with a layout then we should render that with the component
            // as a child
            if (isVNodeWithLayout(Component)) {
              return Component.type.getLayout(h(Component, { ...attrs }));
            }

            // Otherwise we default to the typical <RouterView /> behaviour
            return h(Component, { ...attrs });
          },
        }}
      </RouterView>
    );
  },
});
