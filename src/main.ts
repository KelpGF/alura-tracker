import { createApp } from 'vue';
import App from './App.vue';
import roteador from './routes';

createApp(App).use(roteador).mount('#app');
