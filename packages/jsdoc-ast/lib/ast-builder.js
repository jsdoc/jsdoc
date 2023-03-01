/*
  Copyright 2020 the JSDoc Authors.

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
import babelParser from '@babel/parser';
import { log } from '@jsdoc/util';
import _ from 'lodash';

// Exported so we can use them in tests.
export const parserOptions = {
  allowAwaitOutsideFunction: true,
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  allowUndeclaredExports: true,
  plugins: [
    'asyncGenerators',
    'bigInt',
    'classPrivateMethods',
    'classPrivateProperties',
    'classProperties',
    [
      'decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
    'doExpressions',
    'dynamicImport',
    'estree',
    'exportDefaultFrom',
    'exportNamespaceFrom',
    'functionBind',
    'functionSent',
    'importMeta',
    'jsx',
    'logicalAssignment',
    'nullishCoalescingOperator',
    'numericSeparator',
    'objectRestSpread',
    'optionalCatchBinding',
    'optionalChaining',
    [
      'pipelineOperator',
      {
        proposal: 'minimal',
      },
    ],
    'throwExpressions',
  ],
  ranges: true,
};

function parse(source, filename, sourceType) {
  let ast;
  const options = _.defaults({}, parserOptions, { sourceType });

  try {
    ast = babelParser.parse(source, options);
  } catch (e) {
    log.error(`Unable to parse ${filename}: ${e.message}`);
  }

  return ast;
}

// TODO: docs
export class AstBuilder {
  // TODO: docs
  static build(source, filename, sourceType) {
    return parse(source, filename, sourceType);
  }
}
