const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      // Indentation rules
      indent: ['error', 2],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],

      // Import ordering rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in imports (come from NodeJS)
            'external', // External imports
            'internal', // Absolute imports (from within the project)
            ['sibling', 'parent'], // Relative imports
            'index', // Index imports
            'object', // Object imports
            'type', // Type imports
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            // React imports first
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            // Expo imports next
            {
              pattern: 'expo/**',
              group: 'external',
              position: 'before',
            },
            // React Native imports
            {
              pattern: 'react-native',
              group: 'external',
              position: 'before',
            },
            // Component imports
            {
              pattern: 'components/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'expo', 'react-native'],
        },
      ],
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // Other common rules
      'no-console': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
]);
