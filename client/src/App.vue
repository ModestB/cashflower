<template>
  <main>
    <Header />
    <router-view />
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
<style lang="scss"></style>
