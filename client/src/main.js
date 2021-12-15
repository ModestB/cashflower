import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import './assets/scss/all.scss';

import router from './router';
import store from './store';
import BaseIcon from '@/components/base/BaseIcon.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-icon', BaseIcon)

app.mount('#app');
