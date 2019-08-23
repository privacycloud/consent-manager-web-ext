module.exports = {
  env: {
    browser: true,
    node: true, // for configuration files
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  globals: {
    browser: true,
    process: true /* populated by webextension-toolbox */,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  root: true,
  rules: {
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': 'error',
    'sort-imports': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
