<template>
  <main>
    <Header />
    <section>
      <router-view />
    </section>
  </main>
</template>

<script>
import Header from '@/components/header/Header.vue';

export default {
  components: {
    Header,
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
