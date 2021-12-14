import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import './assets/scss/all.scss';

import router from './router';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
