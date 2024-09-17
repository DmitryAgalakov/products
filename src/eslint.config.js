import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
    plugins: ['react'],
  },
];
