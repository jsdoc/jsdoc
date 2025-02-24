import { parseDTSFile } from '../../index.js';
import { expect } from 'chai';
import path from 'path';

describe('parseDTSFile', () => {
  it('should parse a .d.ts file and return an AST', () => {
    const filePath = path.join(__dirname, '../fixtures/example.d.ts');
    const ast = parseDTSFile(filePath);

    expect(ast).to.be.an('object');
    expect(ast).to.have.property('type', 'File');
    expect(ast.program).to.have.property('type', 'Program');
  });

  it('should throw an error if the file does not exist', () => {
    const filePath = path.join(__dirname, '../fixtures/nonexistent.d.ts');

    expect(() => parseDTSFile(filePath)).to.throw(Error);
  });
});
