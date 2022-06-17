import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { createHead } from '@vueuse/head';

const head = createHead();

const app = createApp(App).use(router).use(head);

app.mount('#app');
