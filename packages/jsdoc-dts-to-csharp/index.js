export function convertToCSharp(parsedDTS) {
  // Define a mapping between TypeScript types and C# types
  const typeMappings = {
    string: 'string',
    number: 'double',
    boolean: 'bool',
    any: 'object',
    void: 'void',
    // Add more mappings as needed
  };

  // Helper function to convert TypeScript type to C# type
  function convertType(tsType) {
    return typeMappings[tsType] || 'object';
  }

  // Helper function to convert TypeScript interface to C# class
  function convertInterface(tsInterface) {
    const className = tsInterface.id.name;
    const properties = tsInterface.body.body.map((prop) => {
      const propName = prop.key.name;
      const propType = convertType(prop.typeAnnotation.typeAnnotation.type);
      return `public ${propType} ${propName} { get; set; }`;
    });

    return `public class ${className} {\n  ${properties.join('\n  ')}\n}`;
  }

  // Convert parsed TypeScript AST to C# source code
  const csharpSources = parsedDTS.program.body
    .filter((node) => node.type === 'TSInterfaceDeclaration')
    .map((tsInterface) => convertInterface(tsInterface));

  return csharpSources.join('\n\n');
}
