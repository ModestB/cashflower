<template>
  <form @submit.prevent="handleLogin">
    <p v-if="error">{{ error }}</p>
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
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  padding: var(--main-padding-3) var(--main-padding-2);
}

button {
  margin-top: var(--main-padding-2);
}
</style>
