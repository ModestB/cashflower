// Minimizing material-ui Bundle Size
// https://material-ui.com/guides/minimizing-bundle-size/#option-2

const { useBabelRc, override } = require('customize-cra');

module.exports = override(
  useBabelRc(),
);
