const Context = require('./analyzer');
const Program = require('./entities/program');
const Body = require('./entities/body');
const Statement = require('./entities/statement');
const Definition = require('./entities/definition');
const VariableDefinition = require('./entities/variabledefinition');
const StructDefinition = require('./entities/structdefinition');
const FunctionDefinition = require('./entities/functiondefinition');
const FunCall = require('./entities/funcall');
const Args = require('./entities/args');
const Arg = require('./entities/arg');
const AssertDefinition = require('./entities/assertdefinition');
const ObjectDefinition = require('./entities/objectdefinition');
const Expression = require('./entities/expression');
const BinaryExpression = require('./entities/binaryexpression');
const TypeExpression = require('./entities/typeexpression');
const For = require('./entities/for');
const IfElse = require('./entities/ifelse');
const Match = require('./entities/match');
const MatchBlock = require('./entities/matchblock');
const MatchPattern = require('./entities/matchpattern');
const StructId = require('./entities/structid');
const Type = require('./entities/type');
const Primitive = require('./entities/primitive');
const ObjectLiteral = require('./entities/object');
const Tuple = require('./entities/tuple');
const List = require('./entities/list');
const Boolean = require('./entities/boolean');
const Integer = require('./entities/integer');
const StringLiteral = require('./entities/string');
const Float = require('./entities/float');
const Id = require('./entities/id');
const CharLit = require('./entities/charlit');
const Char = require('./entities/char');
const Op = require('./entities/op');
const Assert = require('./entities/assert');

const indentPadding = 2;
let indentLevel = 0;

function genStatementList(statements) {
  indentLevel += 1;
  statements.forEach(statement => statement.gen());
  indentLevel -= 1;
}

function emit(line) {
  console.log(`${' '.repeat(indentPadding * indentLevel)}${line}`);
}

function makeOp(op) {
  return { and: '&&', or: '||', '==': '===', '!=': '!==' }[op] || op;
}

<<<<<<< HEAD
const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v))) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
  };
})();

function bracketIfNecessary(a) {
  if (a.length === 1) {
    return `${a}`;
  }
  return `[${a.join(', ')}]`;
}


function generateLibraryFunctions() {
  function generateLibraryStub(name, params, body) {
    const entity = Context.INITIAL.variables[name];
    emit(`function ${jsName(entity)} (${params}) {${body}}`);
  }
  // This is sloppy. There should be a better way to do this.
  generateLibraryStub('print', 's', 'console.log(s);');
  generateLibraryStub('sqrt', 'x', 'return Math.sqrt(x);');
}
=======
Object.assign(Program.prototype, {
  gen() { return `(${this.body})`; },
});

Object.assign(Body.prototype, {
  gen() { return `(${this.statements})`; },
});

Object.assign(Statement.prototype, {
  gen() { return `(${this.statement})`; },
});

Object.assign(Definition.prototype, {
  gen() { return `(${this.typeOfDef})`; },
});

Object.assign(VariableDefinition.prototype, {
  gen() { return `(${})`; },
});
>>>>>>> e175b6f872037c800f2c0e1b23d4e345d041b139

Object.assign(BinaryExpression.prototype, {
  gen() { return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`; },
});
