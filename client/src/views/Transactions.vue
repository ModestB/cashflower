<template>
  <ViewLayout>
    <template #header>
      <ViewTitle :title="title" :icon="titleIcon" />
    </template>
  </ViewLayout>
</template>
<script>
import ViewLayout from '@/components/layouts/ViewLayout.vue';
import ViewTitle from '@/components/view/ViewTitle.vue';

import { VIEWS } from '@/constants';

export default {
  name: 'Transactions',
  components: { ViewLayout, ViewTitle },
  data() {
    return {
      content: '',
    };
  },
  setup() {
    const view = VIEWS.transactions;
    return {
      title: view.label,
      titleIcon: view.icon,
    };
  },
};
</script>
