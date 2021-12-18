<template>
  <div class="base-icon" :class="classes">
    <component :is="currentIcon"></component>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    noHover: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentIcon() {
      return defineAsyncComponent(() =>
        import(`@/components/icons/general/${this.iconName}.vue`)
      );
    },
    classes() {
      return {
        'base-icon--no-hover': this.noHover,
      };
    },
  },
};
</script>

<style lang="scss">
.base-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(.base-icon--no-hover) {
    svg {
      fill: red;
    }
  }

  svg {
    height: 24px;
    width: 24px;
    fill: var(--primary);
    transition: fill 0.3s ease-in;
  }
}
</style>
