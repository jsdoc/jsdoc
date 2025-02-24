import babelParser from '@babel/parser';
import fs from 'fs';

export function parseDTSFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const ast = babelParser.parse(fileContent, {
    sourceType: 'module',
    plugins: ['typescript'],
  });

  return ast;
}
