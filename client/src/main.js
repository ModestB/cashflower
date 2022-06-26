import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vSelect from 'vue-select';
import App from './App.vue';

import 'normalize.css';
import './assets/scss/all.scss';
import 'vue-select/dist/vue-select.css';

import router from './router';
import clickOutsideDirective from '@/utilities/clickOutsideDirective';
import BaseIcon from '@/components/base/BaseIcon.vue';
import BasePopper from '@/components/base/BasePopper.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseBox from '@/components/base/BaseBox.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.component('base-icon', BaseIcon);
app.component('base-popper', BasePopper);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);
app.component('base-input', BaseInput);
app.component('base-alert', BaseAlert);
app.component('base-box', BaseBox);
app.component('base-modal', BaseModal);
app.component('base-select', BaseSelect);

app.component('v-select', vSelect);

app.directive('click-outside', clickOutsideDirective);

app.mount('#app');
