<template>
  <section class="base-view">
    <aside class="base-view__aside">
      <WalletSidebar />
    </aside>
    <header class="base-view__header">
      <slot name="header"></slot>
    </header>
    <section class="base-view__body">
      <base-box>
        <slot></slot>
      </base-box>
    </section>
  </section>
</template>

<script>
import WalletSidebar from '@/components/walletsSidebar/WalletsSidebar.vue';

export default {
  components: {
    WalletSidebar,
  },
};
</script>
<style lang="scss" scoped>
.base-view {
  display: grid;
  grid-template:
    'a b b' 70px
    'a c c' calc(100% - 70px) / var(--wallets-sidebar-width) calc(100% -
        var(--wallets-sidebar-width));
  height: 100%;
  padding: var(--main-spacing-4) var(--main-spacing-4) var(--main-spacing-4) 0;

  .base-view__aside {
    grid-area: a;
    margin: var(--main-spacing-4-negative) var(--main-spacing-4)
      var(--main-spacing-4-negative) 0;
  }

  .base-view__header {
    display: flex;
    align-items: center;
    grid-area: b;
  }

  .base-view__body {
    padding: 0;
    margin-top: var(--main-spacing-4);
    box-shadow: var(--main-box-shadow);
    grid-area: c;
  }
}
</style>
