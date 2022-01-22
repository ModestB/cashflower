import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import './assets/scss/all.scss';

import router from './router';
import store from './store';
import clickOutsideDirective from '@/utilities/clickOutsideDirective'
import BaseIcon from '@/components/base/BaseIcon.vue';
import BasePopper from '@/components/base/BasePopper.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseAlert from '@/components/base/BaseAlert.vue';
import BaseViewLayout from '@/components/base/BaseViewLayout.vue';
import BaseBox from "@/components/base/BaseBox.vue";

const app = createApp(App);

app.use(store);
app.use(router);

app.component('base-icon', BaseIcon)
app.component('base-popper', BasePopper)
app.component('base-button', BaseButton)
app.component('base-card', BaseCard)
app.component('base-input', BaseInput)
app.component('base-alert', BaseAlert)
app.component('base-view-layout', BaseViewLayout)
app.component('base-box', BaseBox)

app.directive('click-outside', clickOutsideDirective)

app.mount('#app');
