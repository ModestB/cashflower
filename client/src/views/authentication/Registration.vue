<template>
  <form>
    <base-input
      id="regEmail"
      type="email"
      label="Email"
      placeholder="Your email"
    ></base-input>
    <base-input
      id="regPassword"
      type="password"
      label="Password"
      placeholder="Your password"
    ></base-input>
    <base-input
      id="regPasswordRepeat"
      type="password"
      label="Repeat password"
      placeholder="Repeat your password"
    ></base-input>
    <base-button mode="success">Register</base-button>
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
