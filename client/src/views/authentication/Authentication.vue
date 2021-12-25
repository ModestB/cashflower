<template>
  <div class="auth">
    <base-card class="authBox">
      <nav class="authNav">
        <router-link to="/auth/registration" v-slot="{ isActive }">
          <div class="authNav__item" :class="{ active: isActive }">
            Registration
          </div>
        </router-link>
        <router-link to="/auth/login" v-slot="{ isActive }">
          <div class="authNav__item" :class="{ active: isActive }">Login</div>
        </router-link>
      </nav>
      <router-view></router-view>
    </base-card>
  </div>
</template>

<script>
export default {
  computed: {
    currentPath() {
      console.log(this.$route);

      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.authBox {
  width: 500px;

  .authNav {
    --auth-nav-margin: calc(var(--main-padding-2) * -1);

    display: grid;
    grid-template-columns: 50% 50%;
    border-bottom: 1px solid var(--border-color--muted);
    margin: var(--auth-nav-margin) var(--auth-nav-margin) 0
      var(--auth-nav-margin);

    .authNav__item {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      background-color: var(--primary--light);
      color: var(--text-color);
      transition: background-color 0.3s ease-in, color 0.4s ease;

      &:first-child {
        border-right: 1px solid var(--border-color--muted);

        &:hover,
        &.active {
          border-right-color: var(--border-color--light);
        }
      }

      &:hover,
      &.active {
        cursor: pointer;
        background-color: var(--primary);
        color: var(--text-color--light);
      }
    }
  }
}
</style>
