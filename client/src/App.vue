<template>
  <main>
    <Header />
    <section>
      <router-view />
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import Header from '@/components/header/Header.vue';

import { LOCAL_STORAGE_USER_KEY } from '@/constants';

export default {
  components: {
    Header,
  },
  created() {
    const userString = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (userString) {
      const userData = JSON.parse(userString);
      console.log(userData);
      if (new Date(userData.accessToken.expiresAt) > new Date()) {
        this.$store.commit('auth/SET_USER_DATA', userData);
      }
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch('auth/storageLogout');
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
<style lang="scss" scoped>
main {
  height: 100vh;
}

section {
  margin-top: var(--header-height);
  height: calc(100vh - var(--header-height));
  background-color: var(--main-bg-color);
}
</style>
