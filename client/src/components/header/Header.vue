<template>
  <header class="header">
    <div class="header__title">Cashflower</div>

    <div>
      <person-icon />
      <arrow-icon />
    </div>
    <base-icon iconName="ArrowIcon" noHover></base-icon>
    <base-icon iconName="PersonIcon"></base-icon>
  </header>
</template>

<script>
import PersonIcon from '@/components/icons/general/PersonIcon.vue';
import ArrowIcon from '@/components/icons/general/ArrowIcon.vue';

export default {
  components: {
    PersonIcon,
    ArrowIcon,
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 75px;
  font-size: 26px;
  padding: var(--main-padding);
  box-shadow: var(--main-box-shadow);

  &__title {
    cursor: pointer;
  }
}
</style>
