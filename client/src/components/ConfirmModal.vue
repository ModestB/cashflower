<template>
  <base-modal :show="isModalVisible" @close="$emit('close-sure-modal')">
    <template #header>
      <div>{{ headerTitle }}</div>
    </template>
    <template #default>
      <div class="d-flex justify-content-end mt-2">
        <base-button
          class="mr-3"
          mode="danger"
          type="outline"
          @click="$emit('close-sure-modal')"
          >No</base-button
        >
        <base-button mode="success" @click="$emit('submit-sure-modal')"
          >Yes</base-button
        >
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';

export default {
  components: { BaseButton },
  emits: ['close-sure-modal', 'submit-sure-modal'],
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    headerTitle: {
      type: String,
      required: true,
    },
  },
};
</script>
