<template>
  <form @submit.prevent="handleRegister">
    <ul>
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
    <base-input
      id="regUsername"
      type="text"
      label="Username"
      placeholder="Your username"
      v-model="username"
    ></base-input>
    <base-input
      id="regEmail"
      type="email"
      label="Email"
      placeholder="Your email"
      v-model="email"
    ></base-input>
    <base-input
      id="regPassword"
      type="password"
      label="Password"
      placeholder="Your password"
      v-model="password"
    ></base-input>
    <base-input
      id="regPasswordRepeat"
      type="password"
      label="Repeat password"
      placeholder="Repeat your password"
      v-model="repeatPassword"
    ></base-input>
    <base-button mode="success">Register</base-button>
  </form>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      errors: null,
    };
  },
  methods: {
    handleRegister() {
      this.$store
        .dispatch('auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
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
