import { convertToCSharp } from '../../index.js';
import { expect } from 'chai';

describe('convertToCSharp', () => {
  it('should convert parsed .d.ts JSON to C# sources', () => {
    const parsedDTS = {
      program: {
        body: [
          {
            type: 'TSInterfaceDeclaration',
            id: { name: 'ExampleInterface' },
            body: {
              body: [
                {
                  key: { name: 'exampleProperty' },
                  typeAnnotation: { typeAnnotation: { type: 'TSStringKeyword' } },
                },
              ],
            },
          },
        ],
      },
    };

    const csharpSource = convertToCSharp(parsedDTS);

    expect(csharpSource).to.be.a('string');
    expect(csharpSource).to.include('public class ExampleInterface');
    expect(csharpSource).to.include('public string exampleProperty { get; set; }');
  });

  it('should handle empty parsed .d.ts JSON', () => {
    const parsedDTS = {
      program: {
        body: [],
      },
    };

    const csharpSource = convertToCSharp(parsedDTS);

    expect(csharpSource).to.be.a('string');
    expect(csharpSource).to.equal('');
  });
});
