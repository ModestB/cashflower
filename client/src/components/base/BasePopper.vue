<template>
  <div class="popper" v-click-outside="outsideClickHandler">
    <div ref="button">
      <slot></slot>
    </div>

    <div ref="body">
      <transition name="popup">
        <div class="popper__body" v-show="show">
          <slot name="body"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'Popper',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    hidePopper: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      popper: null,
    };
  },
  mounted() {
    this.popper = createPopper(this.$refs.button, this.$refs.body);

    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered
      // setTimeout required for popper to set popper body position correctly
      setTimeout(() => {
        if (this.show) this.showPopper();
      }, 1000);
    });
  },
  methods: {
    showPopper() {
      this.popper.update();
    },
    outsideClickHandler() {
      if (this.show) this.hidePopper(false);
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.showPopper();
      }
    },
  },
};
</script>

<style lang="scss">
.popper__body {
  background-color: var(--primary--light);
  box-shadow: var(--main-box-shadow-3);
  padding: var(--main-padding-2);
  border-radius: 4px;
  overflow: hidden;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 211ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 141ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform-origin: top right;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
