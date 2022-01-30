<template>
  <teleport to="body">
    <transition name="modal-appear">
      <div v-if="show" @click.self="close" class="modal-wrp">
        <div
          class="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="modalDescription"
        >
          <header class="modal-header" id="modalTitle">
            <slot name="header"></slot>
            <button
              type="button"
              class="modal-close"
              @click="close"
              aria-label="Close modal"
            >
              <base-icon icon-name="times" size="xs" noHover></base-icon>
            </button>
          </header>

          <section class="modal-body" id="modalDescription">
            <slot></slot>
          </section>
        </div>
      </div>
    </transition>
    <transition name="modal-fade">
      <div v-if="show" class="modal-backdrop"></div>
    </transition>
  </teleport>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop,
.modal-wrp {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal-backdrop {
  background-color: var(--backdrop-bg-color);
  z-index: var(--backdrop-z-index);
}

.modal-wrp {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--modal-z-index);
}

.modal {
  background: var(--light-bg-color);
  box-shadow: var(--main-box-shadow-3);
  border-radius: var(--border-radius);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: var(--main-spacing-5) 0;
}

.modal-header {
  display: flex;
  justify-content: center;
  position: relative;
  color: var(--primary);
  font-size: 24px;
  font-weight: 700;
  padding: 0 var(--main-spacing-3) var(--main-spacing-3);
}

.modal-body {
  position: relative;
  padding: 0 var(--main-spacing-3);
}

.modal-close {
  --icon-color-primary: var(--primary);

  background-color: transparent;
  border: none;
  position: absolute;
  top: var(--main-spacing-4-negative);
  right: 0;
  cursor: pointer;

  &:hover {
    --icon-color-primary: var(--danger);
  }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.modal-appear-enter-from,
.modal-appear-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.modal-appear-enter-active,
.modal-appear-leave-active {
  transition: transform 0.4s ease-in-out, opacity 0.3s ease-in-out;
}
</style>
