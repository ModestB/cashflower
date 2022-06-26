<template>
  <form @submit.prevent="handleLogin">
    <transition name="fade-up">
      <base-alert v-if="showErrorAlert" type="error">
        {{ errorMessage }}
      </base-alert>
    </transition>
    <base-input
      id="loginEmail"
      type="email"
      label="Email"
      placeholder="Your email"
      v-model="email"
      :blur="v$.email.$touch"
      :invalid="v$.email.$error"
      :invalid-feedback="v$.email.$errors[0]?.$message"
    ></base-input>
    <base-input
      id="loginPassword"
      type="password"
      label="Password"
      placeholder="Your password"
      v-model="password"
      :blur="v$.password.$touch"
      :invalid="v$.password.$error"
      :invalid-feedback="v$.password.$errors[0]?.$message"
    ></base-input>
    <base-button mode="success" :disabled="this.v$.$error">Login</base-button>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { useAuthStore } from '@/stores/AuthStore';

export default {
  setup() {
    const authStore = useAuthStore();

    return { v$: useVuelidate(), authStore };
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email must be valid', email),
      },
      password: {
        required: helpers.withMessage('Password is required', required),
      },
    };
  },
  methods: {
    handleLogin() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.authStore
        .login({
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' });
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
  },
  computed: {
    errorMessage() {
      return this.v$.$error
        ? 'Please fill out the required fields'
        : this.error;
    },
    showErrorAlert() {
      return this.v$.$error || this.error;
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
