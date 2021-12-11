// {
//   "extends": [
//     // add more generic rulesets here, such as:
//     "airbnb-base",
//     // "eslint:recommended",
//     // "plugin:vue/vue3-recommended",
//     // "prettier"
//     // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
//   ],
//   "rules": {
//     // override/add rules settings here, such as:
//     // 'vue/no-unused-vars': 'error'
//   }
// }
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'prettier',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
