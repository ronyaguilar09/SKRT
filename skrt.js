const ohm = require('ohm-js');

const fs = require('fs');

const contents = fs.readFileSync('skrt.ohm');
const skrtGrammar = ohm.grammar(contents);

class Program {
  constructor(body) {
    this.body = body;
  }
  toString() {
    return `(Program: ${this.body})`;
  }
}

class Body {
  constructor(stmts) {
    this.statements = stmts;
  }
  toString() {
    return `(Body: ${this.statements.join(' ')})`;
  }
}

class Statement {
  constructor(stmt) {
    this.statement = stmt;
  }
  toString() {
    return `(Statement: ${this.statement})`;
  }
}

class Definition {
  constructor(def) {
    this.definition = def;
  }
  toString() {
    return `(Definition: ${this.definition})`;
  }
}

class VariableDefinition {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return `(Var: ${this.id} ${this.exp})`;
  }
}

class StructDefinition {
  constructor(id, struct) {
    this.id = id;
    this.struct = struct;
  }
  toString() {
    return `(StructDef: ${this.id} ${this.struct})`;
  }
}

class FunctionDefinition {
  constructor(funName, params, body) {
    this.id = funName;
    this.params = params;
    this.body = body;
  }
  toString() {
    return `(Func: ${this.id} (Params: ${this.params.join(' ')}) ${this.body})`;
  }
}

class AssertDefinition {
  constructor(type, id, exp) {
    this.type = type;
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return `(Var: ${this.id} ofType: ${this.type} = ${this.exp})`;
  }
}

class ObjectDefinition {
  constructor(id, obj) {
    this.id = id;
    this.obj = obj;
  }
  toString() {
    return `(Obj: ${this.id} = ${this.obj})`;
  }
}

class Expression {
}

class BinaryExpression extends Expression {
  constructor(left, op, right) {
    super();
    this.left = left;
    this.op = op;
    this.right = right;
  }
  toString() {
    return `(${this.left}${this.op}${this.right})`;
  }
}

class VariableExpression extends Expression {
  constructor(v) {
    super();
    this.val = v;
  }
  toString() {
    return `(${this.val})`;
  }
}

class UnaryExpression extends Expression {
  constructor(op, operand) {
    super();
    this.op = op;
    this.operand = operand;
  }
  toString() {
    return `(${this.op.join()}${this.operand.join()})`;
  }
}

class ParensExpression extends Expression {
  constructor(p1, exp, p2) {
    super();
    this.p1 = p1;
    this.exp = exp;
    this.p2 = p2;
  }
  toString() {
    return `(${this.exp})`;
  }
}
class NumericLiteral extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
  toString() {
    return `( ${this.value} )`;
  }
}

class IfElse {
  constructor(cond1, body1, cond2, body2, body3) {
    this.cond1 = cond1;
    this.body1 = body1;
    this.cond2 = cond2;
    this.body2 = body2;
    this.body3 = body3;
  }
  toString() {
    return `If: ${this.cond1} Body: ${this.body1
    } IfElse: ${this.cond2.join(' ')} Body2: ${this.body2.join(' ')
              } Else: ${this.body3} )`;
  }
}

class Else {
  constructor(exp1, body1, body2) {
    this.exp1 = exp1;
    this.body1 = body1;
    this.body2 = body2;
  }
  toString() {
    return `( If: ${this.exp1} Body: ${this.body1
              } Else: ${this.body2} )`;
  }
}

class For {
  constructor(id, exp1, exp2, body) {
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.body = body;
  }
  toString() {
    return `(For: ${this.id} from ${this.exp1} to ${this.exp2} ${this.body})`;
  }
}

class Match {
  constructor(exp, mblock) {
    this.exp = exp;
    this.block = mblock;
  }
  toString() {
    return `(Match: ${this.exp} Block: ${this.block})`;
  }
}

class MatchBlock {
  constructor(pattern, stmt) {
    this.pattern = pattern;
    this.stmt = stmt;
  }
  toString() {
    return `(MatchPattern: ${this.pattern} Statement: ${this.stmt})`;
  }
}

class MatchPattern {
  constructor(exp) {
    this.exp = exp;
  }
  toString() {
    return `(Pattern: ${this.exp})`;
  }
}

class StructId {
  constructor(id) {
    this.id = id;
  }
  toString() {
    return `(Structure: ${this.id})`;
  }
}

class Type {
  constructor(type) {
    this.type = type;
  }
  toString() {
    return `(Type: ${this.type})`;
  }
}

class Primitive {
  constructor(prim) {
    this.value = prim;
  }
  toString() {
    return `(${this.value})`;
  }
}

class ObjectLiteral {
  constructor(id, exp, lastId, lastExp) {
    this.id = id;
    this.exp = exp;
    this.lastId = lastId;
    this.lastExp = lastExp;
  }
  toString() {
    return `Object: { ${this.id}} : ${this.exp}, ${this.lastId} : ${this.lastExp} }`;
  }
}

class Tuple {
  constructor(exp, lastExp) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return `Tuple: (${this.exp}, ${this.lastExp})`;
  }
}

class List {
  constructor(exp, lastExp) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return `List: [${this.exp}, ${this.lastExp}]`;
  }
}

class Boolean {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `${this.value}`;
  }
}

class Integer {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `${this.value}`;
  }
}

class StringLiteral {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `String: ${this.value}`;
  }
}

class Float {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `${this.value}`;
  }
}

class Id {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `Id: ${this.value}`;
  }
}

class CharLit {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `(Char: ${this.value})`;
  }
}

class Char {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `${this.value}`;
  }
}

class Op {
  constructor(op) {
    this.op = op;
  }
  toString() {
    return `${this.op}`;
  }
}

/* eslint-disable no-unused-vars */
const semantics = skrtGrammar.createSemantics().addOperation('tree', {
  Program(body) { return new Program(body.tree()); },
  Body(stmts) { return new Body(stmts.tree()); },
  Stmts(stmt) { return new Statement(stmt.tree()); },
  Def(def) { return new Definition(def.tree()); },
  VarDef(_, id, _a, exp, _b) { return new VariableDefinition(id.sourceString, exp.tree()); },
  StructDef(_, id, _a, struct, _b) { return new StructDefinition(id.sourceString, struct.tree()); },
  FunDef(_, funName, params, _a, _b, body, _c) { return new FunctionDefinition(funName.sourceString, params.tree(), body.tree()); },
  CamlDef(_, type, _a, id, _b, exp, _c) { return new AssertDefinition(type.tree(), id.sourceString, exp.tree()); },
  ObjDef(_, id, _a, obj) { return new ObjectDefinition(id.sourceString, obj.tree()); },
  Exp_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
 // Exp_binary(left, op, right) { return new BinaryExpression(left.tree(), op.sourceString, right.tree()); },
  Exp2_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp3_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp4_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp5_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp6_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp7_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp8(type) { return new VariableExpression(type.tree()); },
  // Exp_unary(op, operand) { return new UnaryExpression(op.sourceString, operand.tree()); },
  Exp9_parens(p1, exp, p2) { return exp.tree(); },
 // NumLit(value) { return new NumericLiteral(value.sourceString); },
  For(_, id, from, exp1, to, exp2, b1, body, b2) { return new For(id.sourceString, exp1.tree(), exp2.tree(), body.tree()); },
  IfElse(_, _a, cond1, p, _b, body1, _c, _d, _e, cond2, _f, _g, body2, _h, _i, _j, body3, _k) { return new IfElse(cond1.tree(), body1.tree(), cond2.tree(), body2.tree(), body3.tree()); },
  Match(_, _a, exp, _b, _c, block) { return new Match(exp.tree(), block.tree()); },
  MatchBlock(_, pattern, _a, stmt) { return new MatchBlock(pattern.tree(), stmt.tree()); },
  MatchPat(exp) { return new MatchPattern(exp.tree()); },
  StructId(id) { return new StructId(id.sourceString); },
  Type(type) { return new Type(type.tree()); },
  Prim(prim) { return new Primitive(prim.tree()); },
  Obj(openB, id, colon, exp, comma, lastId, lastColon, lastExp, lastCloseB) { return new ObjectLiteral(id.sourceString, exp.tree(), lastId.sourceString, lastExp.tree()); },
  Tuple(openP, exp, comma, lastExp, closeP) { return new Tuple(exp.tree(), lastExp.tree()); },
  List(openP, exp, comma, lastExp, closeP) { return new List(exp.tree(), lastExp.tree()); },
  bool(val) { return new Boolean(this.sourceString); },
  int(val) { return new Integer(this.sourceString); },
  stringlit(p, val, p2) { return new StringLiteral(val.sourceString); },
  float(val, dot, val2) { return new Float(this.sourceString); },
  id(first, rest) { return new Id(this.sourceString); },
  charlit(p1, val, p2) { return new CharLit(val.sourceString); },
  char(val) { return new Char(val.sourceString); },
  relop(op) { return new Op(op.sourceString); },
  addop(op) { return new Op(op.sourceString); },
  mulop(op) { return new Op(op.sourceString); },
  preop(op) { return new Op(op.sourceString); },
  exop(op) { return new Op(op.sourceString); },
  dotop(op) { return new Op(op.sourceString); },
  wild(op) { return new Op(op.sourceString); },

});

const startContents = fs.readFileSync('sampleSKRTCode.txt');

const match = skrtGrammar.match(startContents);

if (match.succeeded()) {
  console.log(`AST of ${startContents} `, semantics(match).tree().toString());
}
// read args
// Parse
// constole.log(.ast())
