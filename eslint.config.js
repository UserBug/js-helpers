import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsDocPlugin from 'eslint-plugin-jsdoc';
import constCasePlugin from 'eslint-plugin-const-case';

const eslintServerConfig = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setImmediate: 'readonly',
      }
    },
    plugins: {
      'jsdoc': jsDocPlugin,
      'const-case': constCasePlugin,
    },
    rules: {
      'quotes': ['error', 'single', { avoidEscape: true }],

      // Naming conventions
      'camelcase': ['error', { properties: 'always' }],
      'const-case/uppercase': 'error',

      // File and code structure
      'max-lines': ['error', { max: 400, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
      'max-params': ['error', { max: 3 }],
      'max-depth': ['error', { max: 2 }],
      'complexity': ['error', { max: 12 }],

      // Import rules
      'import/order': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: false }],
      'import/no-unresolved': 'error',
      'import/extensions': ['error', 'ignorePackages', {
        js: 'always',
        ts: 'always'
      }],

      // JSDoc rules
      'jsdoc/check-alignment': 'error',
      'jsdoc/check-param-names': ['error', {
        disableExtraPropertyReporting: true,
      }],
      'jsdoc/check-types': 'error',
      'jsdoc/require-jsdoc': ['error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
          FunctionExpression: true
        }
      }],
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/require-description': 'off',
      'jsdoc/require-param': ['error', {
        unnamedRootBase: ['arg', 'config']
      }],

      // General best practices
      'eqeqeq': ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },
]

export default eslintServerConfig;
