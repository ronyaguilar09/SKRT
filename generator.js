const Context = require('./analyzer');
const Program = require('./entities/program');
const Body = require('./entities/body');
const Statement = require('./entities/statement');
const Definition = require('./entities/definition');
const VariableDefinition = require('./entities/variabledefinition');
const StructDefinition = require('./entities/structdefinition');
const FunctionDefinition = require('./entities/functiondefinition');
const FunCall = require('./entities/funcall');
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
const BooleanLiteral = require('./entities/boolean');
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

const jsName = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!(map.has(v.name))) {
      map.set(v.name, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.name}_${map.get(v.name)}`;
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
}

Object.assign(Program.prototype, {
  gen() {
    // generateLibraryFunctions();
    this.body.gen();
  },
});

Object.assign(Body.prototype, {
  gen() {
    this.statements.forEach(statement => statement.gen());
  },
});

Object.assign(Statement.prototype, {
  gen() { emit(`${this.statement.gen()}`); },
});

Object.assign(Definition.prototype, {
  gen() { return `${this.typeOfDef.gen()}`; },
});

Object.assign(Id.prototype, {
  gen() {
    return jsName(this);
  },
});

Object.assign(BinaryExpression.prototype, {
  gen() {
    let exp = `${this.left.gen()}`;


    for (let i = 0; i < this.right.length; i += 1) {
      exp += ` ${makeOp(this.op[i].gen())} ${this.right[i].gen()}`;
    }
    return exp;
  },
});

Object.assign(TypeExpression.prototype, {
  gen() {
    return this.exp.gen();
  },
});

Object.assign(Type.prototype, {
  gen() {
    return this.literal.gen();
  },
});

Object.assign(Primitive.prototype, {
  gen() {
    return this.prim.gen();
  },
});

Object.assign(Arg.prototype, {
  gen() { return `(${this.arg.gen()})`; },
});

Object.assign(FunctionDefinition.prototype, {
  gen() {
    emit(`function ${jsName(this.id)}(${this.params.map(p => p.gen()).join(', ')}) {`);
    genStatementList(this.body);
    emit('}');
  },
});

Object.assign(VariableDefinition.prototype, {
  gen() { return (`let ${jsName(this.id)} = (${this.exp.gen()});`); },
});

Object.assign(StructDefinition.prototype, {
  gen() { emit(`let ${jsName(this.id)} = (${this.struct.gen()});`); },
});

Object.assign(StructId.prototype, {
  gen() { return jsName(this.id); },
});

// CamlDef????

Object.assign(ObjectDefinition.prototype, {
  gen() { emit(`let ${jsName(this.id)} = (${this.obj.gen()});`); },
});

Object.assign(IfElse.prototype, {
  gen() {
    emit(`if (${this.cond1.gen()}) { ${this.body1.gen()}
        } else if (${this.cond2.gen()}) {${this.body2.gen()}
        } else { ${this.body3.gen()} }`);
  },
});

Object.assign(For.prototype, {
  gen() {
    emit(`for (${jsName(this.id)} = (${this.exp1.gen()});
               ${jsName(this.id)} <= (${this.exp2.gen()});
               ${jsName(this.id)}++) {
                   ${this.body.gen()}
        };`);
  },
});

Object.assign(BooleanLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Char.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(CharLit.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(Float.prototype, {
  gen() { return `${this.value1}.${this.value2}`; },
});

Object.assign(Integer.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(AssertDefinition.prototype, {
  gen() { emit(`let ${this.id} = ${this.value};`); },
});

Object.assign(Op.prototype, {
  gen() { return `${this.operator}`; },
});

Object.assign(List.prototype, {
  gen() { return (`[${this.exp.gen()}, ${this.lastExp.gen()}]`); },
});

Object.assign(Tuple.prototype, {
  gen() { return (`(${this.exp.gen()}, ${this.lastExp.gen()})`); },
});

Object.assign(ObjectLiteral.prototype, {
  gen() { return (`{${this.lastId.gen()}} : ${this.lastExp.gen()}, ${this.id.gen()} : ${this.exp.gen()}}`); },
});
