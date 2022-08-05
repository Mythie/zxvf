import { createHead } from '@vueuse/head';
import { createApp } from 'vue';
import { VueQueryPlugin } from 'vue-query';

import { App } from './App';
import { router } from './router';

const head = createHead();

const app = createApp(App).use(router).use(head).use(VueQueryPlugin);

app.mount('#app');
