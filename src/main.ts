import { createApp } from 'vue';
import App from './App.vue';
import roteador from './routes';
import { keyStore, store } from './store';

createApp(App).use(roteador).use(store, keyStore).mount('#app');
