<template>
  <button class="addWallet" @click="showModal">
    Add Wallet
    <base-icon icon-name="plus"></base-icon>
  </button>
  <AddWalletModal :isModalVisible="isModalVisible" @close-modal="hideModal" />
</template>

<script>
import AddWalletModal from './AddWalletModal.vue';

export default {
  components: { AddWalletModal },
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.addWallet {
  --icon-color-primary: var(--text-color--darker);
  --button-text-color: var(--text-color--darker);

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: var(--button-text-color);
  padding: var(--main-spacing-2);
  transition: color 0.3s ease-in-out;

  &:hover {
    --icon-color-primary: var(--primary);
    --button-text-color: var(--primary);
  }
}
</style>
