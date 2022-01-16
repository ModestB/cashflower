<template>
  <form @submit.prevent="handleRegister">
    <transition name="fade-up">
      <base-alert v-if="showErrorAlert" type="error">
        <p>{{ errorMessage }}</p>
        <ul v-show="errors">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </base-alert>
    </transition>
    <base-input
      id="regUsername"
      type="text"
      label="Username"
      placeholder="Your username"
      v-model="username"
      :blur="v$.username.$touch"
      :invalid="v$.username.$error"
      :invalid-feedback="v$.username.$errors[0]?.$message"
    ></base-input>
    <base-input
      id="regEmail"
      type="email"
      label="Email"
      placeholder="Your email"
      v-model="email"
      :blur="v$.email.$touch"
      :invalid="v$.email.$error"
      :invalid-feedback="v$.email.$errors[0]?.$message"
    ></base-input>
    <base-input
      id="regPassword"
      type="password"
      label="Password"
      autocomplete="new-password"
      placeholder="Your password"
      v-model="password"
      :blur="v$.password.$touch"
      :invalid="v$.password.$error"
      :invalid-feedback="v$.password.$errors[0]?.$message"
    ></base-input>
    <base-input
      id="regPasswordRepeat"
      type="password"
      label="Repeat password"
      placeholder="Repeat your password"
      v-model="repeatPassword"
      :blur="v$.repeatPassword.$touch"
      :invalid="v$.repeatPassword.$error"
      :invalid-feedback="v$.repeatPassword.$errors[0]?.$message"
    ></base-input>
    <base-button mode="success" :disabled="this.v$.$error"
      >Register</base-button
    >
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from '@vuelidate/validators';

export default {
  name: 'Register',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      errors: null,
    };
  },
  validations() {
    return {
      username: {
        required: helpers.withMessage('Username is required', required),
      },
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Email must be valid', email),
      },
      password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage(
          'Password should be at least 7 characters long',
          minLength(7)
        ),
      },
      repeatPassword: {
        required,
        sameAsPassword: helpers.withMessage(
          'Passwords must match',
          sameAs(this.password)
        ),
      },
    };
  },
  methods: {
    handleRegister() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
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
  computed: {
    errorMessage() {
      return this.v$.$error
        ? 'Please fill out the required fields'
        : 'Check registration credentials!';
    },
    showErrorAlert() {
      return this.v$.$error || this.errors;
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
