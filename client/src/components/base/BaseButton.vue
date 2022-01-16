<template>
  <button class="btn" :class="buttonClasses">
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
    mode: {
      type: String,
      default: '',
    },
  },
  computed: {
    buttonClasses() {
      const classes = [];

      if (this.type === 'link') {
        classes.push('btn--link');
      }

      if (this.mode.length) {
        classes.push(`btn--${this.mode}`);
      }

      return classes.join(' ');
    },
  },
};
</script>

<style lang="scss">
.btn {
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
    user-select: none;

    &:hover {
      color: var(--highlight);
    }
  }

  &:not(.btn--link) {
    font-size: 18px;
    font-weight: 400;
    height: 40px;
    padding: 0 var(--main-spacing-4);
    border-radius: var(--border-radius);
    border-width: 1px;
    border-style: solid;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  &.btn--success {
    border-color: var(--success);
    background-color: var(--success);
    color: var(--text-color--light);

    &:hover,
    &:focus {
      border-color: var(--success--darker);
      background-color: var(--success--darker);
    }
  }
}
</style>
