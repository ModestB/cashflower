<template>
  <button class="button" :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
  },
  computed: {
    buttonClasses() {
      const classes = [];

      if (this.type === 'link') {
        classes.push('button--link');
      }

      return classes.join(' ');
    },
  },
};
</script>

<style lang="scss">
.button {
  transition: color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &--link {
    font-size: 18px;
    font-weight: 400;
    padding: 4px 0;
    background-color: transparent;
    border: none;
    color: var(--text-color);

    &:hover {
      color: var(--highlight);
    }
  }
}
</style>
