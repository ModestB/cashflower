<template>
  <form>
    <base-input
      id="loginEmail"
      type="email"
      label="Email"
      placeholder="Your email"
    ></base-input>
    <base-input
      id="loginPassword"
      type="password"
      label="Password"
      placeholder="Your password"
    ></base-input>
    <base-button mode="success">Login</base-button>
  </form>
</template>

<style lang="scss" scoped>
form {
  padding: var(--main-padding-3) var(--main-padding-2);
}

button {
  margin-top: var(--main-padding-2);
}
</style>
