<template>
  <teleport to="#header-button-place">
    <base-button type="success" @click="showModal">Add Transaction</base-button>
  </teleport>
  <base-modal :show="isAddModalOpen" @close="hideModal">
    <template #header>
      <div>Add Transaction</div>
    </template>
    <template #default>
      <div class="d-flex">
        <base-select
          :options="this.walletsStore.walletsArrayForSelect"
          :selected="selectedWallet"
          @set-selected="setSellectedWallet"
          class="mr-3"
          label="Wallet"
        >
        </base-select>
      </div>
      <div class="d-flex">
        <base-input
          id="transactionAmount"
          type="number"
          label="Amount"
          placeholder="Enter transaction amount"
          class="mr-3"
          v-model="amount"
        >
        </base-input>
        <base-input
          id="transactionNote"
          type="number"
          label="Note"
          placeholder="Enter transaction note"
          class="mr-3"
          v-model="note"
        >
        </base-input>
      </div>
      <div class="d-flex justify-content-end mt-2">
        <base-button
          class="mr-3"
          mode="danger"
          type="outline"
          @click="closeModal"
        >
          Cancel
        </base-button>
        <base-button
          mode="success"
          @click="submitHandler"
          :disabled="disableSubmit"
        >
          Save
        </base-button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import { useWalletsStore } from '@/stores/WalletsStore';

export default {
  data() {
    return {
      isAddModalOpen: false,
      selectedWallet: null,
      amount: 0,
      note: '',
    };
  },
  setup() {
    const walletsStore = useWalletsStore();

    return {
      walletsStore,
    };
  },
  mounted() {
    [this.selectedWallet] = this.walletsStore.walletsArrayForSelect;
  },
  methods: {
    showModal() {
      this.isAddModalOpen = true;
    },
    hideModal() {
      this.isAddModalOpen = false;
    },
    setSellectedWallet(event) {
      this.selectedWallet = event.value;
    },
  },
};
</script>
