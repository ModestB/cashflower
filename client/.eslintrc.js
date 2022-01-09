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
    "import/no-extraneous-dependencies": [
      "error", {
         "devDependencies": true
      }
    ],
    "no-param-reassign": [
      "error",
      {
        "props": true,
        "ignorePropertyModificationsFor": [
          "state"
        ]
      }
    ]
  },
  settings: { 
    'import/resolver': { 
      webpack: { 
        config: require.resolve('@vue/cli-service/webpack.config.js') 
      } 
    }, 
  },
};
