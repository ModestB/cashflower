<template>
  <aside class="sidebar">
    <logo></logo>

    <ul>
      <SidebarListItem
        v-for="item in items"
        :key="item.id"
        :icon="item.icon"
        :routeName="item.routeName"
        >{{ item.label }}</SidebarListItem
      >
    </ul>
  </aside>
</template>

<script>
import Logo from '@/components/icons/Logo.vue';
import SidebarListItem from '@/components/sidebar/SidebarListItem.vue';
import { VIEWS } from '@/constants';

export default {
  components: {
    logo: Logo,
    SidebarListItem,
  },
  setup() {
    return {
      items: Object.values(VIEWS),
    };
  },
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--primary--light);
  box-shadow: var(--main-box-shadow);
  z-index: 2;
  padding: 18px 0 0;
}

ul {
  width: 100%;
  padding: 0;
  margin-top: var(--main-spacing-4);
}
</style>
