<template>
  <form @submit.prevent="handleLogin">
    <transition name="fade-up">
      <base-alert v-if="error" type="error">
        {{ error }}
      </base-alert>
    </transition>
    <base-input
      id="loginEmail"
      type="email"
      label="Email"
      placeholder="Your email"
      v-model="email"
    ></base-input>
    <base-input
      id="loginPassword"
      type="password"
      label="Password"
      placeholder="Your password"
      v-model="password"
    ></base-input>
    <base-button mode="success">Login</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' });
        })
        .catch((error) => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  padding: var(--main-spacing-3) var(--main-spacing-2);
}

button {
  margin-top: var(--main-spacing-2);
}
</style>
