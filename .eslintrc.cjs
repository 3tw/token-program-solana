module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['/public'],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }]
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'ForInStatement',
      'WithStatement',
    ],
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
  },
}
