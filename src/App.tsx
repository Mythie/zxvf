import { useHead } from '@vueuse/head';
import { defineComponent, Suspense } from 'vue';

import { AppView } from './AppView';

import './App.css';

export const App = defineComponent({
  name: 'App',

  setup: () => {
    useHead({
      title: 'Hello World',
    });

    return () => (
      <main class="flex min-h-screen flex-col bg-gray-50">
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

            default: () => <AppView class="flex-1" />,
          }}
        </Suspense>
      </main>
    );
  },
});
