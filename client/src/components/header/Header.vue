<template>
  <header class="header" :class="{ 'header--notAuth': !loggedIn }">
    <transition name="logo" mode="out-in">
      <component v-bind:is="currentLogo"></component>
    </transition>

    <transition name="menu">
      <base-popper v-if="loggedIn" :show="showMenu" :hidePopper="hideMenu">
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
    </transition>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import Logo from '@/components/icons/Logo.vue';
import LogoLoggedIn from '@/components/header/LogoLoggedIn.vue';
import LogoLoggedOut from '@/components/header/LogoLoggedOut.vue';

export default {
  components: {
    logo: Logo,
    'logged-in-logo': LogoLoggedIn,
    'logged-out-logo': LogoLoggedOut,
  },
  data() {
    return {
      showMenu: false,
      view: 'logo',
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
      this.$store.dispatch('auth/logout');
    },
  },
  computed: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
    arrowRotation() {
      return this.showMenu ? '180' : '0';
    },
    currentLogo() {
      return this.loggedIn ? 'logged-in-logo' : 'logged-out-logo';
    },
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 26px;
  padding: var(--main-spacing-2);
  background-color: var(--primary--light);
  box-shadow: var(--main-box-shadow);

  &.header--notAuth {
    justify-content: center;
  }

  &__title {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;

    svg {
      margin-right: var(--main-spacing-2);
      width: 35px;
    }
  }

  &__menu__toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-left: 2px solid var(--primary);
    padding: var(--main-spacing) 0 var(--main-spacing) var(--main-spacing-2);
  }

  &__menu__body {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>

<style lang="scss" scoped>
.logo-enter-active,
.menu-enter-active {
  transition: all 0.5s ease;
}

.logo-leave-active {
  transition: all 0.5s ease-out;
}

.logo-enter-from,
.logo-leave-to {
  opacity: 0;
}

.menu-leave-from,
.menu-leave,
.menu-enter-from {
  opacity: 0;
}
</style>
