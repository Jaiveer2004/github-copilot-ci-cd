import eslint from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'coverage/**', 'dist/**', 'build/**']
  },
  eslint.configs.recommended,
  {
    files: ['server.js', 'index.js', 'tests/**/*.js'],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['public/**/*.js'],
    languageOptions: {
      globals: globals.browser
    }
  }
];
