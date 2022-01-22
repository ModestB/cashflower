<template>
  <div class="icon-wrapper">
    <base-icon :iconName="icon" size="2x" noHover> </base-icon>
  </div>
  <h2>{{ title }}</h2>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.icon-wrapper {
  --icon-color-primary: var(--text-color--light);

  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary);
}

h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 0 var(--main-spacing-3);
}
</style>
