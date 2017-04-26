const ohm = require('ohm-js');
const fs = require('fs');

const contents = fs.readFileSync('skrt.ohm');
const skrtGrammar = ohm.grammar(contents);

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
const BooleanLiteral = require('./entities/boolean');
const Integer = require('./entities/integer');
const StringLiteral = require('./entities/string');
const Float = require('./entities/float');
const Id = require('./entities/id');
const CharLit = require('./entities/charlit');
const Char = require('./entities/char');
const Op = require('./entities/op');
const Assert = require('./entities/assert');
const PrintStatement = require('./entities/printstatement');

/* eslint-disable no-unused-vars */
const semantics = skrtGrammar.createSemantics().addOperation('tree', {
  Program(body) { return new Program(body.tree()); },
  Body(stmts) { return new Body(stmts.tree()); },
  Stmts(stmt) { return new Statement(stmt.tree()); },
  Def(def) { return new Definition(def.tree()); },
  VarDef(_, id, _a, exp, _b) { return new VariableDefinition(id.tree(), exp.tree()); },
  StructDef(_, id, _a, struct, _b) { return new StructDefinition(id.tree(), struct.tree()); },
  FunDef(_, funName, params, _a, _b, body, _c) { return new FunctionDefinition(funName.tree(), params.tree(), body.tree()); },
  FunCall(id, args, s) { return new FunCall(id.tree(), args.tree()); },
  Arg(arg) { return new Arg(arg.tree()); },
  // Args(arg) { return new Args(arg.tree()); },
  CamlDef(_, type, _a, id, _b, exp, _c) { return new AssertDefinition(type.tree(), id.tree(), exp.tree()); },
  ObjDef(_, id, _a, obj, semi) { return new ObjectDefinition(id.tree(), obj.tree()); },
  Exp_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp2_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp3_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp4_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp5_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp6_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp7_binary(left, op, right) { return new BinaryExpression(left.tree(), op.tree(), right.tree()); },
  Exp8(type) { return new TypeExpression(type.tree()); },
  Exp9_parens(p1, exp, p2) { return exp.tree(); },
  For(_, id, from, exp1, to, exp2, b1, body, b2) { return new For(id.tree(), exp1.tree(), exp2.tree(), body.tree()); },
  IfElse(_, _a, cond1, p, _b, body1, _c, _d, _e, cond2, _f, _g, body2, _h, _i, _j, body3, _k) { return new IfElse(cond1.tree(), body1.tree(), cond2.tree(), body2.tree(), body3.tree()); },
  Match(_, _a, exp, _b, _c, block) { return new Match(exp.tree(), block.tree()); },
  MatchBlock(_, pattern, _a, stmt) { return new MatchBlock(pattern.tree(), stmt.tree()); },
  MatchPat(exp) { return new MatchPattern(exp.tree()); },
  Print(pr, p1, exp, p2, s) { return new PrintStatement(exp.tree()); },
  StructId(id) { return new StructId(id.tree()); },
  Type(type) { return new Type(type.tree()); },
  Prim(prim) { return new Primitive(prim.tree()); },
  Obj(openB, id, colon, exp, comma, lastId, lastColon, lastExp, lastCloseB) { return new ObjectLiteral(id.tree(), exp.tree(), lastId.tree(), lastExp.tree()); },
  Tuple(openP, exp, comma, lastExp, closeP) { return new Tuple(exp.tree(), lastExp.tree()); },
  List(openP, exp, comma, lastExp, closeP) { return new List(exp.tree(), lastExp.tree()); },
  assert(type) { return new Assert(type.sourceString); },
  bool(val) { return new BooleanLiteral(val.sourceString); },
  int(val) { return new Integer(val.sourceString); },
  stringlit(p, val, p2) { return new StringLiteral(val.sourceString); },
  float(val, dot, val2) { return new Float(val.sourceString); },
  id(first, rest) { return new Id(first.sourceString, rest.sourceString); },
  charlit(p1, val, p2) { return new CharLit(val.sourceString); },
  char(val) { return new Char(val.sourceString); },
  relop(op) { return new Op(op.sourceString); },
  addop(op) { return new Op(op.sourceString); },
  logop(op) { return new Op(op.sourceString); },
  mulop(op) { return new Op(op.sourceString); },
  preop(op) { return new Op(op.sourceString); },
  exop(op) { return new Op(op.sourceString); },
  dotop(op) { return new Op(op.sourceString); },
  wild(op) { return new Op(op.sourceString); },

});

const startContents = fs.readFileSync('sampleSKRTCode.txt');

const match = skrtGrammar.match(startContents);

/*
if (match.succeeded()) {
  console.log(`AST of ${startContents} `, semantics(match).tree().toString());
}
*/

const program = semantics(match).tree();

module.exports = (text) => {
  const testMatch = skrtGrammar.match(text);
  if (!match.succeeded()) {
    throw new Error(`Syntax Error: ${match.message}`);
  }
  return semantics(testMatch).tree();
};
