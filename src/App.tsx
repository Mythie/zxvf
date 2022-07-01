import { useHead } from '@vueuse/head';
import { defineComponent, Suspense } from 'vue';
import { RouterView } from 'vue-router';

import './App.css';

export const App = defineComponent({
  name: 'App',

  setup: () => {
    useHead({
      title: 'Hello World',
    });

    return () => (
      <main class="flex flex-col min-h-screen bg-gray-50">
        <Suspense>
          {{
            fallback: () => (
              <div>
                <div class="text-center">
                  <div class="animate-spin">
                    <p>Loading...</p>
                  </div>
                </div>
              </div>
            ),

            default: () => <RouterView class="flex-1" />,
          }}
        </Suspense>
      </main>
    );
  },
});
