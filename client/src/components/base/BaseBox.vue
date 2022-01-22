<template>
  <div class="box">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.box {
  background-color: var(--light-bg-color);
  border-radius: var(--border-radius);
  width: 100%;
  min-height: 100%;
}
</style>
