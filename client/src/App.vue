<template>
  <main class="main" :class="{ 'no-sidebar': !authStore.loggedIn }">
    <transition name="sidebar">
      <Sidebar v-if="authStore.loggedIn" />
    </transition>
    <Header />
    <router-view />
  </main>
</template>

<script>
import axios from 'axios';
import Header from '@/components/header/Header.vue';
import Sidebar from '@/components/sidebar/Sidebar.vue';

import { LOCAL_STORAGE_USER_KEY } from '@/constants';
import { useWalletsStore } from '@/stores/WalletsStore';
import { useAuthStore } from '@/stores/AuthStore';

export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const wallets = useWalletsStore();
    const authStore = useAuthStore();

    return {
      wallets,
      authStore,
    };
  },
  created() {
    const userString = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (userString) {
      const userData = JSON.parse(userString);
      if (new Date(userData.accessToken.expireAt) > new Date()) {
        this.authStore.setUserData(userData);
        this.wallets.getWallets();
      }
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.authStore.unsetUserData();
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
<style lang="scss">
.main {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template:
    'b a a' var(--header-height)
    'b c c' calc(100vh - var(--header-height)) / var(--sidebar-width) calc(100vw -
        var(--sidebar-width));

  &.no-sidebar {
    grid-template:
      'a a a' var(--header-height)
      'c c c' calc(100vh - var(--header-height)) / 100vw;
  }

  > section {
    background-color: var(--main-bg-color);
    grid-area: c;
  }

  .header {
    grid-area: a;
  }

  .sidebar {
    grid-area: b;
  }
}
</style>

<style lang="scss" scoped>
.logo-enter-active,
.sidebar-enter-active {
  transition: all 0.5s ease;
}

.logo-leave-active {
  transition: all 0.5s ease-out;
}

.logo-enter-from,
.logo-leave-to {
  opacity: 0;
}

.sidebar-leave-from,
.sidebar-leave,
.sidebar-enter-from {
  transform: translate(-100px, 0);
}
</style>
