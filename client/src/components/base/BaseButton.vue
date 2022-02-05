<template>
  <button class="btn" :class="buttonClasses" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    /*
     * Types
     *  link
     *  outline
     */
    type: {
      type: String,
      default: 'button',
    },
    /*
     * Modes
     *  success
     *  danger
     */
    mode: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      const classes = [];

      if (this.type !== 'button') {
        classes.push(`btn--${this.type}`);
      }

      if (this.mode.length) {
        classes.push(`btn--${this.mode}`);
      }

      if (this.size) {
        classes.push(`btn--${this.size}`);
      }

      return classes.join(' ');
    },
  },
};
</script>

<style lang="scss">
.btn {
  $this: &;

  --btn-font-size: 18px;
  --btn-border-color: transparent;
  --btn-bg-color: transparent;
  --btn-text-color: transparent;
  --btn-link-text-color: var(--text-color);
  --btn-link-text-color--hover: var(--highlight);

  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease-in-out;

  &:hover {
    --btn-link-text-color: var(--highlight);

    cursor: pointer;
  }

  // TYPES

  &--link {
    font-size: var(--btn-font-size);
    font-weight: 400;
    padding: 4px 0;
    background-color: transparent;
    border: none;
    color: var(--btn-link-text-color);
    user-select: none;
  }

  &--outline {
    &#{$this}--danger {
      --btn-text-color: var(--danger);
      --btn-border-color: var(--danger);

      &:hover {
        --btn-bg-color: var(--danger);
        --btn-text-color: var(--text-color--light);
      }
    }
  }

  &:not(.btn--link) {
    font-size: var(--btn-font-size);
    font-weight: 400;
    height: 40px;
    padding: 0 var(--main-spacing-4);
    border-radius: var(--border-radius);
    border-width: 1px;
    border-style: solid;
    border-color: var(--btn-border-color);
    background-color: var(--btn-bg-color);
    color: var(--btn-text-color);
  }

  &.btn--success {
    --btn-border-color: var(--success);
    --btn-bg-color: var(--success);
    --btn-text-color: var(--text-color--light);

    &:hover,
    &:focus {
      --btn-border-color: var(--success--darker);
      --btn-bg-color: var(--success--darker);
      --btn-link-text-color: var(--success);
    }
  }

  &.btn--danger {
    &:hover {
      --btn-link-text-color: var(--danger);
    }
  }

  &.btn--info {
    &:hover {
      --btn-link-text-color: var(--secondary);
    }
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &.btn--sm {
    font-size: 12px;
  }
}
</style>
