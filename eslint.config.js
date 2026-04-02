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
import jsdoc from '@jsdoc/eslint-config';
import globals from 'globals';

export default [
  {
    ignores: ['packages/jsdoc-web-assets/static/**/*'],
  },
  {
    files: ['packages/**/test/**/*.js'],
    languageOptions: {
      globals: {
        jsdoc: 'readonly',
      },
    },
  },
  {
    files: ['packages/jsdoc-web-assets/scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          plugins: [['@babel/plugin-proposal-decorators', { version: '2023-11' }]],
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  ...jsdoc,
];
