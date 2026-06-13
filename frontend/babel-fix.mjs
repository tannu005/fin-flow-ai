import fs from 'fs';
import * as parser from '@babel/parser';
import traverseModule from '@babel/traverse';
import generatorModule from '@babel/generator';

// Handle ES Module default exports for Babel packages
const traverse = traverseModule.default || traverseModule;
const generate = generatorModule.default || generatorModule;

const code = fs.readFileSync('src/App.jsx', 'utf8');

const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx']
});

traverse(ast, {
  VariableDeclarator(path) {
    if (
      path.node.id.type === 'ArrayPattern' &&
      path.node.id.elements.length > 0 &&
      path.node.id.elements[0] &&
      path.node.id.elements[0].name === 'recruiterMode'
    ) {
      path.parentPath.remove();
    }
  },
  ConditionalExpression(path) {
    if (path.node.test.name === 'recruiterMode') {
      path.replaceWith(path.node.alternate);
    }
  },
  LogicalExpression(path) {
    if (
      path.node.operator === '&&' &&
      path.node.left.type === 'UnaryExpression' &&
      path.node.left.operator === '!' &&
      path.node.left.argument.name === 'recruiterMode'
    ) {
      path.replaceWith(path.node.right);
    }
  },
  JSXAttribute(path) {
    if (path.node.name.name === 'recruiterMode') {
      path.remove();
    }
  },
  // Remove the recruiterMode button block (it has onClick(() => setRecruiterMode...))
  JSXElement(path) {
    if (path.node.openingElement.name.name === 'button') {
      let isRecruiterBtn = false;
      path.traverse({
        Identifier(p) {
          if (p.node.name === 'setRecruiterMode') isRecruiterBtn = true;
        }
      });
      if (isRecruiterBtn && path.parentPath.node.openingElement && path.parentPath.node.openingElement.name.name === 'div') {
        path.parentPath.remove();
      }
    }
  }
});

const output = generate(ast, { retainLines: false, comments: true }, code);
fs.writeFileSync('src/App.jsx.ast', output.code);
console.log('AST Fix applied');
