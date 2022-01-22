<template>
  <section class="base-view">
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

<style lang="scss" scoped>
.base-view {
  display: grid;
  grid-template-rows: 70px calc(100% - 70px);
  height: 100%;
  padding: var(--main-spacing-4);

  .base-view__header {
    display: flex;
    align-items: center;
  }

  .base-view__body {
    padding: 0;
    margin-top: var(--main-spacing-4);
    box-shadow: var(--main-box-shadow);
  }
}
</style>
