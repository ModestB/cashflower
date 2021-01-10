module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [0],
    "react/jsx-props-no-spreading": "off",
    'arrow-parens': [0],
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          ':': 'before',
        },
      },
    ],
  },
};
