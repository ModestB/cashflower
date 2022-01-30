<template>
  <li
    class="wallet-item"
    :class="{ active: active }"
    @click="setActiveWallet(id)"
  >
    <div class="wallet-item__title">
      <div class="wallet-item__title__name">{{ name }}</div>
      <div class="wallet-item__title__balance">{{ balance }}</div>
    </div>
    <div class="wallet-item__options">
      <div class="wallet-item__options__type">{{ type }}</div>
      <div class="wallet-item__options__actions" v-if="active">
        <base-button type="link" size="sm" mode="success" @click="showAddModal"
          >Edit</base-button
        >
        <base-button
          type="link"
          size="sm"
          mode="danger"
          @click="showConfirmDeleteModal"
          >Delete</base-button
        >
      </div>
    </div>
  </li>
  <AddWalletModal
    :isModalVisible="isModalVisible"
    @close-modal="hideAddModal"
    :isEditModal="true"
    :name="this.name"
    :balance="this.balance"
    :type="this.type"
    :id="this.id"
  />
  <ConfirmModal
    :isModalVisible="isConfirmDeleteModalVisible"
    :headerTitle="`Are you sure you want to delete ${name} Wallet?`"
    @close-sure-modal="hideConfirmDeleteModal"
    @submit-sure-modal="deleteHandler"
  />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BaseButton from '@/components/base/BaseButton.vue';
import AddWalletModal from './AddWalletModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';

export default {
  components: { BaseButton, AddWalletModal, ConfirmModal },
  props: {
    id: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isModalVisible: false,
      isConfirmDeleteModalVisible: false,
    };
  },
  computed: {
    ...mapGetters({ activeWallet: 'wallets/activeWallet' }),
    active() {
      return this.id === this.activeWallet;
    },
  },

  methods: {
    ...mapMutations({ setActiveWallet: 'wallets/SET_ACTIVE_WALLET' }),
    showAddModal() {
      this.isModalVisible = true;
    },
    hideAddModal() {
      this.isModalVisible = false;
    },
    hideConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = false;
    },
    showConfirmDeleteModal() {
      this.isConfirmDeleteModalVisible = true;
    },
    deleteHandler() {
      this.$store.dispatch('wallets/deleteWallet', this.id);
    },
  },
};
</script>

<style lang="scss">
.wallet-item {
  --text-color: var(--text-color--darker);
  --item-bg-color: transparent;
  --after-bg-color: var(--light-gray);

  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: var(--main-spacing-2);
  padding: var(--main-spacing-2);
  background-color: var(--item-bg-color);

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 2px;
    width: 50%;
    background-color: var(--after-bg-color);
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    --text-color: var(--primary);

    cursor: pointer;

    &:after {
      --after-bg-color: var(--primary);

      width: 100%;
    }
  }

  &.active {
    --text-color: var(--text-color--light);
    --item-bg-color: var(--primary);

    &:after {
      --after-bg-color: var(--primary);

      width: 100%;
    }
  }

  .wallet-item__title__name,
  .wallet-item__title__balance,
  .wallet-item__options__type {
    color: var(--text-color);
    transition: color 0.3s ease-in;
  }

  .wallet-item__title {
    display: flex;
    justify-content: space-between;

    &__name {
      font-size: 16px;
    }

    &__balance {
      font-size: 19px;
      font-weight: 700;
    }
  }

  .wallet-item__options {
    display: flex;
    justify-content: space-between;
    margin-top: var(--main-spacing-1);

    &__type {
      font-size: 12px;
    }

    &__actions {
      display: flex;
      align-items: center;

      .btn {
        margin-left: var(--main-spacing);
        // font-size: 12px;
      }
    }
  }
}
</style>
