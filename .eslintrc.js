module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'playwright'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:playwright/playwright-test',
  ],
  env: {
    node: true,
    es2020: true,
  },
  settings: {
    // Treat our custom base.extend() fixtures as Playwright `test` functions so
    // rules like no-standalone-expect recognise expect() inside them.
    playwright: {
      globalAliases: {
        test: ['apiTest', 'uiTest'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    // Allow intentionally failing tests in this candidate-test harness
    'playwright/no-skipped-test': 'off',
  },
};
