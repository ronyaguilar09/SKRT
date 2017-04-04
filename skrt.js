const ohm = require('ohm-js');

const fs = require('fs');

const contents = fs.readFileSync('skrt.ohm');
const skrtGrammar = ohm.grammar(contents);

const Program = require('../entities/program');
const Body = require('../entities/body');
const Statement = require('../entities/statement');
const Definition = require('../entities/definition');
const VariableDefinition = require('../entities/variabledefinition');
const StructDefinition = require('../entities/structdefinition');
const FunctionDefinition = require('../entities/functiondefinition');
const AssertDefinition = require('../entities/assertdefinition');
const ObjectDefinition = require('../entities/objectdefinition');
const BinaryExpression = require('../entities/binaryexpression');
const VariableExpression = require('../entities/variableexpression');
const For = require('../entities/for');
const IfElse = require('../entities/ifelse');
const Match = require('../entities/match');
const MatchBlock = require('../entities/matchblock');
const MatchPattern = require('../entities/matchpattern');
const StructId = require('../entities/structid');
const Type = require('../entities/type');
const Primitive= require('../entities/primitive');
const ObjectLiteral = require('../entities/objectliteral');
const Tuple = require('../entities/tuple');
const List = require('../entities/list');
const Boolean = require('../entities/boolean');
const Integer = require('../entities/integer');
const StringLiteral = require('../entities/stringliteral');
const Float = require('../entities/float');
const Id = require('../entities/id');
const CharLit = require('../entities/charlit');
const Char = require('../entities/char');
const Op = require('../entities/op');

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
  // IfElse_else(_, _a, exp1, _b, _c, body1, _d, _e, _f, body2, _g) { return new Else(exp1.tree(), body1.tree(), body2.tree()); },
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
