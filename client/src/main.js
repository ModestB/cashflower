import { createApp } from 'vue';
import App from './App.vue';
// import ClickOutside from 'vue-click-outside';
import 'normalize.css';
import './assets/scss/all.scss';

import router from './router';
import store from './store';
import clickOutsideDirective from '@/utilities/clickOutsideDirective'
import BaseIcon from '@/components/base/BaseIcon.vue';
import BasePopper from '@/components/base/BasePopper.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-icon', BaseIcon)
app.component('base-popper', BasePopper)
app.component('base-button', BaseButton)

app.directive('click-outside', clickOutsideDirective)

app.mount('#app');
