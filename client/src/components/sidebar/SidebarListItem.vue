<template>
  <li
    class="sidebar-list-item"
    :class="{ active: active }"
    @click="clickHandler"
  >
    <base-icon :iconName="icon" size="2x" noHover> </base-icon>
    <h6>
      <slot></slot>
    </h6>
  </li>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    routeName: {
      type: String,
      required: true,
    },
  },
  computed: {
    active() {
      return this.$route.name === this.routeName;
    },
  },
  methods: {
    clickHandler() {
      this.$router.push({ name: this.routeName });
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  --icon-color-primary: var(--text-color--darker);
  --text-color: var(--text-color--darker);

  list-style-type: none;
  width: 100%;
  height: 80px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:not(.active):hover {
    --icon-color-primary: var(--primary);
    --text-color: var(--primary);

    cursor: pointer;
  }

  &.active {
    --icon-color-primary: var(--text-color--light);
    --text-color: var(--text-color--light);

    background-color: var(--primary);
  }
}

h6 {
  color: var(--text-color);
  font-size: 16px;
  margin-top: var(--main-spacing-2);
  margin-bottom: 0;
  transition: color 0.3s ease-in-out;
}
</style>
