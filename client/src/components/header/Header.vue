<template>
  <header class="header">
    <div class="header__title">Cashflower</div>

    <base-popper :show="showMenu" :hidePopper="hideMenu">
      <template v-slot:default>
        <div class="header__menu__toggle" @click="toggleMenu">
          <base-icon iconName="user" size="xs" noHover></base-icon>
          <base-icon
            iconName="chevron-down"
            size="xs"
            :rotation="arrowRotation"
            noHover
          ></base-icon>
        </div>
      </template>
      <template v-slot:body>
        <div class="header__menu__body">
          <base-button type="link" @click="logoutHandler">Logout</base-button>
          <base-button type="link">Settings</base-button>
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
    logoutHandler() {
      console.log('Logout');
    },
  },
  computed: {
    arrowRotation() {
      return this.showMenu ? '180' : '0';
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100vw;
  max-width: 100%;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  font-size: 26px;
  padding: var(--main-padding-2);
  background-color: var(--primary--light);
  box-shadow: var(--main-box-shadow);

  &__title {
    cursor: pointer;
    user-select: none;
  }

  &__menu__toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-left: 2px solid var(--primary);
    padding: var(--main-padding) 0 var(--main-padding) var(--main-padding-2);
  }

  &__menu__body {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
