// eslint.config.js
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
    { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },
  // Базовые правила JS
  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist/**', 'node_modules/**'],

    languageOptions: {
        globals: {
  ...globals.browser,
  ...globals.node,
},
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      // типы и TS
      '@typescript-eslint/no-explicit-any': 'error',

      // форматирование
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      semi: ['error', 'never'], // без ;
      'eol-last': ['error', 'always'],

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Vite + React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
  files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
  languageOptions: {
    globals: {
      test: 'readonly',
      expect: 'readonly',
      describe: 'readonly',
      it: 'readonly',
      beforeEach: 'readonly',
      afterEach: 'readonly',
      beforeAll: 'readonly',
      afterAll: 'readonly',
      jest: 'readonly'
    }
  }
}
]
