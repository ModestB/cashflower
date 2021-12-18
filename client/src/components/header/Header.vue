<template>
  <header class="header">
    <div class="header__title">Cashflower</div>

    <base-popper :show="showMenu" :hidePopper="hideMenu">
      <template v-slot:default>
        <div class="header__menu__toggle" @click="toggleMenu">
          <base-icon iconName="PersonIcon" noHover></base-icon>
          <base-icon iconName="ArrowIcon" noHover></base-icon>
        </div>
      </template>
      <template v-slot:body>
        <div class="header__menu__body">
          <base-button>Logout</base-button>
          <base-button>Settings</base-button>
        </div>
      </template>
    </base-popper>
  </header>
</template>
<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    hideMenu() {
      this.showMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  font-size: 26px;
  padding: var(--main-padding-2);
  box-shadow: var(--main-box-shadow);

  &__title {
    cursor: pointer;
    user-select: none;
  }

  &__menu__toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-left: 1px solid var(--primary);
    padding: var(--main-padding) 0 var(--main-padding) var(--main-padding-2);
  }

  &__menu__body {
    display: flex;
    flex-direction: column;
  }
}
</style>
