const ohm = require('ohm-js');

const fs = require('fs');

const contents = fs.readFileSync('skrt.ohm');
const skrtGrammar = ohm.grammar(contents);

class Program {
  constuctor(body) {
    this.body = body;
  }
  toString() {
    return (`( Program: ${this.body} )`);
  }
}

class Body {
  constructor(stmts) {
    this.statement = stmts;
  }
  toString() {
    return (`( Body: ${this.statement} )`);
  }
}

class Statement {
  constructor(stmt) {
    this.statement = stmt;
  }
  toString() {
    return (`( Statement: ${this.statement} )`);
  }
}

class Definition {

}

class VariableDefinition extends Definition {
  constructor(_, id, _a, exp, _b) {
    super();
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return (`( Var: ${this.id} = ${this.exp} )`);
  }
}

class StructDefinition extends Definition {
  constructor(_, id, _a, struct, _b) {
    super();
    this.id = id;
    this.struct = struct;
  }
  toString() {
    return (`( Id: ${this.id} = ( ${this.struct} ) )`);
  }
}

class FunctionDefinition extends Definition {
  constructor(_, funName, params, _a, _b, body, _c) {
    super();
    this.id = funName;
    this.params = params;
    this.body = body;
  }
  toString() {
    return (`( Func: ${this.id} (${this.params})= ${this.body} )`);
  }
}

class AssertDefinition extends Definition {
  constructor(_, type, _a, id, _b, exp, _c) {
    super();
    this.type = type;
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return (`( Var: ${this.id} ofType: ${this.type} = ${this.exp} )`);
  }
}

class ObjectDefinition extends Definition {
  constructor(_, id, _a, obj) {
    super();
    this.id = id;
    this.obj = obj;
  }
  toString() {
    return (`( Obj: ${this.id} = ${this.obj} )`);
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
    return (`( ${this.left}${this.op}${this.right} )`);
  }
}

class UnaryExpression extends Expression {
  constructor(op, operand) {
    super();
    this.op = op;
    this.operand = operand;
  }
  toString() {
    return (`( ${this.op}${this.operand} )`);
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
    return (`( ${this.exp} )`);
  }
}

class NumericLiteral extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
  toString() {
    return (`( ${this.value} )`);
  }
}

class IfElse {
  constructor(_, _a, cond1, _b, body1, _c, _d, _e, cond2, _f, _g, body2, _h, _i, _j, body3, _k) {
    this.cond1 = cond1;
    this.body1 = body1;
    this.cond2 = cond2;
    this.body2 = body2;
    this.body3 = body3;
  }
  toString() {
    return (`If: ${this.cond1} Body: ${this.body1
              } IfElse: ${this.cond2} Body2: ${this.body2
              } Else: ${this.body3} )`);
  }
}

class Else {
  constructor(_, _a, exp1, _b, _c, body1, _d, _e, _f, body2, _g) {
    this.exp1 = exp1;
    this.body1 = body1;
    this.body2 = body2;
  }
  toString() {
    return (`( If: ${this.exp1} Body: ${this.body1
              } Else: ${this.body2} )`);
  }
}

class For {
  constructor(_, id, from, exp1, to, exp2, b1, body, b2) {
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.body = body;
  }
}

class Match {
  constructor(_, _a, exp, _b, _c, mblock) {
    this.exp = exp;
    this.block = mblock;
  }
  toString() {
    return (`( Match: ${this.exp} Block: ${this.block} )`);
  }
}

class MatchBlock {
  constructor(_, pattern, _a, stmt) {
    this.pattern = pattern;
    this.stmt = stmt;
  }
  toString() {
    return (`( MatchPattern: ${this.pattern} Statement: ${this.stmt} )`);
  }
}

class MatchPattern {
  constructor(exp) {
    this.exp = exp;
  }
  toString() {
    return (`( Pattern: ${this.exp} )`);
  }
}

class StructId {
  constructor(id) {
    this.id = id;
  }
  toString() {
    return (`( ${this.id} )`);
  }
}

class Type {
  constructor(type) {
    this.type = type;
  }
  toString() {
    return (`( ${this.type} )`);
  }
}

class Primitive {
  constructor(prim) {
    this.value = prim;
  }
  toString() {
    return (`( ${this.value} )`);
  }
}
// Objects, Tuples and Lists, how do we store into constructor?
class Object {
  constructor(openB, id, colon, exp, comma, lastId, lastColon, lastExp, lastCloseB) {
    this.id = id;
    this.exp = exp;
    this.lastId = lastId;
    this.lastExp = lastExp;
  }
  toString() {
    return (`Object: { ${this.id}} : ${this.exp}, ${this.lastId} : ${this.lastExp} }`);
  }
}

class Tuple {
  constructor(openP, exp, comma, lastExp, closeP) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return (`Tuple: (${this.exp}, ${this.lastExp})`);
  }
}

class List {
  constructor(openB, exp, comma, lastExp, closeB) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return (`List: [${this.exp}, ${this.lastExp}]`);
  }
}

class Boolean {
  constructor(value) {
    this.value = value;
  }
}

class Integer {
  constructor(value) {
    this.value = value;
  }
}

class String {
  constructor(value) {
    this.value = value;
  }
}
class Float {
  constructor(value) {
    this.value = value;
  }
}

class Id {
  constructor(value) {
    this.value = value;
  }
}

class IdRest {
  constructor(value) {
    this.value = value;
  }
}

class CharLit {
  constructor(value) {
    this.value = value;
  }
}

class Char {
  constructor(value) {
    this.value = value;
  }
}


const semantics = skrtGrammar.createSemantics().addOperation('tree', {
  Program(body) { return new Program(body.tree()); },
  Body(stmt) { return new Body(stmt.tree()); },
  Stmts(stmt) { return new Statement(stmt.tree()); },
  VarDef(_, id, _a, exp, _b) { return new VariableDefinition(id.sourceString, exp.tree()); },
  StructDef(_, id, _a, struct, _b) { return new StructDefinition(id.sourceString, struct.tree()); },
  FunDef(_, funName, params, _a, _b, body, _c) { return new FunctionDefinition(funName.sourceString, params.tree(), body.tree()); },
  CamlDef(_, type, _a, id, _b, exp, _c) { return new AssertDefinition(type.tree(), id.sourceString, exp.tree()); },
  ObjDef(_, id, _a, obj) { return new ObjectDefinition(id.sourceString, obj.tree()); },
  BinExp(left, op, right) { return new BinaryExpression(left.tree(), op.sourceString, right.tree()); },
  UnaryExp(op, operand) { return new UnaryExpression(op.sourceString, operand.tree()); },
  ParensExp(p1, exp, p2) { return new ParensExpression(exp.tree()); },
  NumLit(value) { return new NumericLiteral(value.sourceString); },
  For(_, id, from, exp1, to, exp2, b1, body, b2) { return new For(id.sourceString, exp1.tree(), exp2.tree(), body.tree()); },
  IfElse(_, _a, cond1, _b, body1, _c, _d, _e, cond2, _f, _g, body2, _h, _i, _j, body3, _k) { return new IfElse(cond1.tree(), body1.tree(), cond2.tree(), body2.tree(), body3.tree()); },
 // Else_(_, _a, exp1, _b, _c, body1, _d, _e, _f, body2, _g) { return new Else(exp1.tree(), body1.tree(), body2.tree()); },
  MatchStmt(_, _a, exp, _b, _c, block) { return new Match(exp.tree(), block.tree()); },
  MatchBlck(_, pattern, _a, stmt) { return new MatchBlock(pattern.tree(), stmt.tree()); },
  MatchPat(exp) { return new MatchPattern(exp.tree()); },
  StrucId(id) { return new StructId(id.sourceString); },
  Type_(type) { return new Type(type.tree()); },
  Prim(prim) { return new Primitive(prim.tree()); },
  Obj(openB, id, colon, exp, comma, lastId, lastColon, lastExp, lastCloseB) { return new Object(id.sourceString, exp.tree(), lastId.sourceString, lastExp.tree()); },
  Tuple_(openP, exp, comma, lastExp, closeP) { return new Tuple(exp.tree(), lastExp.tree()); },
  List_(openP, exp, comma, lastExp, closeP) { return new List(exp.tree(), lastExp.tree()); },
  Bool(val) { return new Boolean(val.sourceString); },
  Int(val) { return new Integer(val.sourceString); },
  Str(val) { return new String(val.sourceString); },
  Flt(val) { return new Float(val.sourceString); },
  Id_(val) { return new Id(val.sourceString); },
  Id_Rest(val) { return new IdRest(val.sourceString); },
  Char_Lit(val) { return new CharLit(val.sourceString); },
  Char_(val) { return new Char(val.sourceString); },
});

const match = skrtGrammar.match('def x = 5;');
if (match.succeeded()) { console.log(semantics(match).tree()); }
// read args
// Parse
// constole.log(.ast())
