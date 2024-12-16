import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
//index.js 파일명은 폴더 까지만 기술해도 가져온다.
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { VueQueryPlugin } from '@tanstack/vue-query';
import VueAwesomePaginate from 'vue-awesome-paginate';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(VueQueryPlugin).use(pinia).use(router).use(VueAwesomePaginate);

app.mount('#app');
