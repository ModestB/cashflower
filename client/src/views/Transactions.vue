<template>
  <base-view-layout>
    <template #header>
      <ViewTitle :title="title" :icon="titleIcon" />
    </template>
  </base-view-layout>
</template>
<script>
import BaseViewLayout from '@/components/base/BaseViewLayout.vue';
import ViewTitle from '@/components/view/ViewTitle.vue';

import { VIEWS } from '@/constants';

export default {
  name: 'Transactions',
  components: { BaseViewLayout, ViewTitle },
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
