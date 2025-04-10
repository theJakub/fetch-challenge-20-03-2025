import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
  { 
    languageOptions: { 
      globals: {
        ...globals.browser,
        React: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        jsx: true
      }
    }
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 
        varsIgnorePattern: 'React' 
      }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
    plugins: {
      'react-hooks': eslintPluginReactHooks
    }
  },
  { ignores: ['dist/'] },
];
