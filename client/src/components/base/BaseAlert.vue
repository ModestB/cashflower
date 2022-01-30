<template>
  <div class="alert" :class="alertType" role="alert">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    alertType() {
      return `alert--${this.type}`;
    },
  },
};
</script>

<style lang="scss">
.alert {
  padding: var(--main-spacing-3) var(--main-spacing-2);
  border-style: solid;
  border-width: 1px;
  border-radius: var(--border-radius);
  font-size: 14px;

  &--error {
    border-color: var(--danger);
    background-color: var(--danger-bg);
    color: var(--danger-text);
  }

  &--success {
    border-color: var(--success);
    background-color: var(--success-bg);
    color: var(--success-text);
  }

  p {
    margin: 0;
  }

  ul {
    margin: var(--main-spacing-2) 0 0 0;

    li {
      margin: 0 0 var(--main-spacing) 0;
    }
  }
}
</style>
