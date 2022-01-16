<template>
  <section class="card">
    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.card {
  background-color: var(--primary--light);
  box-shadow: var(--main-box-shadow-2);
  padding: var(--main-spacing-2);
  border-radius: var(--border-radius);
  overflow: hidden;
}
</style>
