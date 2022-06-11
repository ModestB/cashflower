<template>
  <ViewLayout>
    <template #header>
      <ViewTitle :title="title" :icon="titleIcon" />
    </template>
    <template>
      <AddTransactionModal />
    </template>
  </ViewLayout>
</template>
<script>
import ViewLayout from '@/components/layouts/ViewLayout.vue';
import ViewTitle from '@/components/view/ViewTitle.vue';
import AddTransactionModal from '@/views/transactions/AddTransactionModal.vue';

import { VIEWS } from '@/constants';

export default {
  name: 'Transactions',
  components: { ViewLayout, ViewTitle, AddTransactionModal },
  data() {
    return {
      content: '',
      isAddModalOpen: false,
    };
  },
  setup() {
    const view = VIEWS.transactions;
    return {
      title: view.label,
      titleIcon: view.icon,
    };
  },
  methods: {
    showModal() {
      this.isAddModalOpen = true;
    },
    hideModal() {
      this.isAddModalOpen = false;
    },
  },
};
</script>
