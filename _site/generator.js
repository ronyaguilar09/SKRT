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
const printstatement = require('./entities/printstatement');
const AssignDef = require('./entities/assigndef');

const indentPadding = 2;
let indentLevel = 0;

function genStatementList(statements) {
  indentLevel += 1;
  statements.forEach(statement => statement.gen());
  indentLevel -= 1;
}

function emit(line) {
  console.string = line;
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

Object.assign(AssignDef.prototype, {
  gen() {
    return `${this.id.gen()} = ${this.exp.gen()};`;
  },
});

Object.assign(Program.prototype, {
  gen() {
    // generateLibraryFunctions();
    emit(`${this.body.gen()}`);
  },
});

Object.assign(Body.prototype, {
  gen() {
    let body = '';
    this.statements.forEach((statement) => { body += `${statement.gen()}`; });
    return body;
  },
});

Object.assign(Statement.prototype, {
  gen() { return `${this.statement.gen()}`; },
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
    // let exp = `${this.left.gen()}`;
    // console.log(this);
    const left = `${this.left.gen()}`;
    const op = `${makeOp(this.op)}`;
    const right = `${this.right.gen()}`;
    const exp = left + op + right;

    /*
    for (let i = 0; i < this.right.length; i += 1) {
      const javaOp = this.op[i].gen();
      console.log(javaOp);
      const rightGen = this.right[i].gen();
      exp += `${javaOp}${rightGen}`;
  }*/
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
    return `function ${jsName(this.id)}(${this.params.map(p => p.gen()).join(', ')}) { ${this.body.gen()} }`;
  },
});

Object.assign(FunCall.prototype, {
  gen() {
    return `${jsName(this.id)}(${this.args.map(a => a.gen()).join(', ')});`;
  },
});

Object.assign(VariableDefinition.prototype, {
  gen() { return (`let ${jsName(this.id)} = (${this.exp.gen()});`); },
});

Object.assign(StructDefinition.prototype, {
  gen() { return (`let ${jsName(this.id)} = (${this.struct.gen()});`); },
});

Object.assign(StructId.prototype, {
  gen() { return jsName(this.id); },
});

Object.assign(printstatement.prototype, {
  gen() { return `console.log(${this.exp.gen()});`; },
});

Object.assign(Match.prototype, {
  gen() { return (`switch(${this.exp.gen()}) {${this.block.gen()}}`); },
});

Object.assign(MatchBlock.prototype, {
  gen() {
    let block = '';
    for (let i = 0; i < this.pattern.length; i += 1) {
      block += `case ${this.pattern[i].gen()}:\n\t${this.stmt[i].gen()}\n`;
    }
    return block;
  },
});

Object.assign(MatchPattern.prototype, {
  gen() {
    return `${this.exp.gen()}`;
  },
});

Object.assign(ObjectDefinition.prototype, {
  gen() { return (`let ${jsName(this.id)} = (${this.obj.gen()});`); },
});

Object.assign(IfElse.prototype, {
  gen() {
    let ifelse = `if (${this.cond1.gen()}) { ${this.body1.gen()} } `;
    for (let i = 0; i < this.cond2.length; i += 1) {
      ifelse += `else if (${this.cond2[i].gen()}) {${this.body2[i].gen()} } `;
    }
    console.log(this.body3);
    if (this.body3.length === 1) {
      ifelse += `else { ${this.body3[0].gen()} }`;
    }

    return ifelse;
    /*
    return (`if (${this.cond1.gen()}) { ${this.body1.gen()}
        } else if (${this.cond2.gen()}) {${this.body2.gen()}
    } else { ${this.body3.gen()} }`);*/
  },
});

Object.assign(For.prototype, {
  gen() {
    return (`for (${jsName(this.id)} = (${this.exp1.gen()});
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
  gen() { return `'${this.value}'`; },
});

Object.assign(CharLit.prototype, {
  gen() { return `'${this.value}'`; },
});

Object.assign(Float.prototype, {
  gen() { return `${this.value1}.${this.value2}`; },
});

Object.assign(Integer.prototype, {
  gen() { return `${this.value}`; },
});

Object.assign(StringLiteral.prototype, {
  gen() { return `"${this.value}"`; },
});

Object.assign(AssertDefinition.prototype, {
  gen() { return (`let ${this.id.gen()} = ${this.exp.gen()};`); },
});

Object.assign(Op.prototype, {
  gen() { return `${this.operator}`; },
});

Object.assign(List.prototype, {
  gen() {
    let list = '[';
    for (let i = 0; i < this.exp.length; i += 1) {
      list += `${this.exp[i].gen()},`;
    }
    list += `${this.lastExp.gen()}]`;
    return list;
  },
});

Object.assign(Tuple.prototype, {
  gen() {
    let tuple = '(';
    for (let i = 0; i < this.exp.length; i += 1) {
      tuple += `${this.exp[i].gen()},`;
    }
    tuple += `${this.lastExp.gen()})`;
    return tuple;
  },
});

Object.assign(ObjectLiteral.prototype, {
  gen() { return (`{${this.lastId.gen()}} : ${this.lastExp.gen()}, ${this.id.gen()} : ${this.exp.gen()}}`); },
});
