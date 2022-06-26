<template>
  <div class="wallets-sidebar">
    <h4>Wallets</h4>
    <ul>
      <WalletsSidebarItem
        v-for="wallet in walletsStore.wallets"
        :key="wallet.id"
        :balance="wallet.balance"
        :id="wallet.id"
        :name="wallet.name"
        :type="wallet.type"
      />
    </ul>
    <AddWallet />
  </div>
</template>

<script>
import WalletsSidebarItem from '@/components/walletsSidebar/WalletsSidebarItem.vue';
import AddWallet from '@/components/walletsSidebar/AddWallet.vue';
import { useWalletsStore } from '@/stores/WalletsStore';

export default {
  components: {
    WalletsSidebarItem,
    AddWallet,
  },
  setup() {
    const walletsStore = useWalletsStore();

    return {
      walletsStore,
    };
  },
};
</script>

<style lang="scss" scoped>
.wallets-sidebar {
  height: 100%;
  background-color: var(--primary--light);
  box-shadow: var(--main-box-shadow);
  padding: var(--main-spacing-4) 0;
  overflow-y: auto;
  overflow-x: hidden;

  h4 {
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin: 0;
  }

  > ul {
    margin: var(--main-spacing-4) 0 0;
    padding: 0;
  }
}
</style>
