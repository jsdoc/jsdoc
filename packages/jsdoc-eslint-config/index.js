/*
  Copyright 2019 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import babelParser from '@babel/eslint-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/out/',
      '**/tmp/',
      'coverage/',
      'packages/**/static/**',
      'packages/**/test/fixtures/**',
    ],
  },
  {
    files: ['**/*.cjs', '**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.jasmine,
        ...globals.node,
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
      },
      sourceType: 'module',
    },
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Possible errors
      'array-callback-return': 'error',
      'constructor-super': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-await-in-loop': 'error',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'off',
      'no-constructor-return': 'off',
      'no-control-regex': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': [
        'error',
        {
          includeExports: true,
        },
      ],
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-ex-assign': 'error',
      'no-fallthrough': 'off', // disabled due to bug in ESLint
      'no-func-assign': 'error',
      'no-import-assign': 'error',
      'no-inner-declarations': ['error', 'functions'],
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-loss-of-precision': 'error',
      'no-misleading-character-class': 'error',
      'no-new-symbol': 'error',
      'no-obj-calls': 'error',
      'no-promise-executor-return': 'error',
      'no-prototype-builtins': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-setter-return': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unreachable': 'error',
      'no-unreachable-loop': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-unsafe-optional-chaining': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': ['error', { caughtErrors: 'none' }],
      'no-use-before-define': 'error',
      'no-useless-backreference': 'error',
      'require-atomic-updates': 'error',
      'use-isnan': 'error',
      'valid-typeof': 'error',

      // Suggestions
      'accessor-pairs': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'block-scoped-var': 'off',
      camelcase: 'error',
      'capitalized-comments': 'off',
      'class-methods-use-this': 'off',
      complexity: 'off', // TODO: enable
      'consistent-return': 'error',
      'consistent-this': ['error', 'self'],
      curly: ['error', 'all'],
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'func-name-matching': ['error', 'always'],
      'func-names': 'off',
      'func-style': 'off',
      'grouped-accessor-pairs': 'error',
      'guard-for-in': 'error',
      'id-denylist': 'off',
      'id-length': 'off',
      'id-match': 'off',
      'init-declarations': 'off',
      'max-classes-per-file': 'off',
      'max-depth': 'off', // TODO: enable
      'max-lines': 'off',
      'max-lines-per-function': 'off',
      'max-nested-callbacks': 'off',
      'max-params': 'off', // TODO: enable
      'max-statements': 'off',
      'multiline-comment-style': 'off',
      'new-cap': 'error',
      'no-alert': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-case-declarations': 'error',
      'no-console': 'off',
      'no-continue': 'off',
      'no-delete-var': 'error',
      'no-div-regex': 'error',
      'no-else-return': 'off',
      'no-empty': 'error',
      'no-empty-function': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-label': 'error',
      'no-global-assign': 'error',
      'no-implicit-coercion': 'error',
      'no-implicit-globals': 'error',
      'no-implied-eval': 'error',
      'no-inline-comments': 'off',
      'no-invalid-this': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-magic-numbers': 'off', // TODO: enable?
      'no-multi-assign': 'off',
      'no-multi-str': 'error',
      'no-negated-condition': 'off',
      'no-nested-ternary': 'error',
      'no-new': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-nonoctal-decimal-escape': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-regex-spaces': 'error',
      'no-restricted-exports': 'off',
      'no-restricted-globals': ['error', 'app', 'env'],
      'no-restricted-imports': 'off',
      'no-restricted-properties': 'off',
      'no-restricted-syntax': 'off',
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-sequences': 'error',
      'no-shadow': 'error',
      'no-shadow-restricted-names': 'error',
      'no-ternary': 'off',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-undefined': 'off',
      'no-underscore-dangle': 'off',
      'no-unneeded-ternary': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-useless-call': 'error',
      'no-useless-catch': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'off',
      'no-useless-escape': 'error',
      'no-useless-rename': 'error',
      'no-useless-return': 'error',
      'no-var': 'off', // TODO: enable
      'no-void': 'error',
      'no-warning-comments': 'off',
      'no-with': 'error',
      'object-shorthand': 'off',
      'one-var': 'off',
      'operator-assignment': 'off',
      'prefer-arrow-callback': 'off',
      'prefer-const': 'off',
      'prefer-destructuring': 'off',
      'prefer-exponentiation-operator': 'error',
      'prefer-named-capture-group': 'off', // TODO: enable
      'prefer-numeric-literals': 'off',
      'prefer-object-has-own': 'off', // TODO: enable
      'prefer-object-spread': 'off',
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'off',
      'prefer-spread': 'off',
      'prefer-template': 'off',
      radix: 'error',
      'require-await': 'error',
      'require-unicode-regexp': 'off',
      'require-yield': 'error',
      'sort-imports': 'off', // We use https://github.com/lydell/eslint-plugin-simple-import-sort instead
      'sort-keys': 'off',
      'sort-vars': 'off', // TODO: enable?
      strict: ['error', 'global'],
      'symbol-description': 'error',
      'vars-on-top': 'off', // TODO: enable
      yoda: 'error',

      // Layout and formatting
      'line-comment-position': 'off',
      'unicode-bom': ['error', 'never'],

      // https://github.com/prettier/eslint-plugin-prettier
      'prettier/prettier': 'error',

      // https://github.com/lydell/eslint-plugin-simple-import-sort
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
    },
  },
  prettierConfig,
];
