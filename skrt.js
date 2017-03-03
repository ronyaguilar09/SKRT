const ohm = require('ohm-js');

const skrtGrammar = ohm.grammar(`SKRT {
    Program     =  Body
    Body        =  Stmts*
    Stmts       =  Def
              |  IfElse
              |  For
              |  Exp
    Def         = VarDef | FunDef | CamlDef | ObjDef | StructDef
    StructDef   = "def" StructId "=" StructId ";"
    VarDef      = "def" id "=" Exp ";"
    FunDef      = "def" id "=>" "{" Body "}"
    CamlDef     = "def" Type ":" id "=" Exp";" // dont restrict just to primitive types here
    ObjDef      = "type" id "=" Obj
    IfElse      = "if" "(" Exp ")" "{" Body "}" ( "else if" "(" Exp ")" "{" Body "}" )* ("else" "{" Body "}")? --ifelse
                |"if" "(" Exp ")" "{" Body "}" ("else" "{" Body "}")? --else
    For         = "for" id "from" Exp "to" Exp "{" Body "}"
    Match       = "match" "(" Exp ")" "with" MatchBlock
    MatchBlock  = ("|" MatchPat "=>" Stmts)+
    MatchPat    = Exp|"_"
    StructId    = id | Tuple
    Exp         = Exp1("or" Exp)*
    Exp1        = Exp2("and" Exp1)*
    Exp2        = Exp3(relop Exp2)*
    Exp3        = Exp4(addop Exp3)*
    Exp4        = Exp5(mulop Exp4)*
    Exp5        = Exp6(preop Exp6)?
    Exp6        = Exp7("**" Exp7)*
    Exp7        = Exp8("." Exp8)?
    Exp8        = Type | Match | Exp9
    Exp9        = "(" Exp ")"
    Type        = Prim | Tuple | List
    Prim        = bool|int|stringlit|float|id|charlit
    Obj         = "{" (~(id ":" Exp "}" ) (id ":" Exp "," ))* (id ":" Exp "}" )
    Tuple       = "(" (~(Exp ")")(Exp","))* (Exp ")")
    List        = "[" (~(Exp ")")(Exp ","))* (Exp "]")

    bool        = "true" | "false"
    int         = digit+
    stringlit   = "\"" (char|"\'")* "\""
    float       = digit* "." digit+
    id          = ~keyword letter idrest*
    idrest      = "_" | alnum
    charlit     = "\'"any"\'" --characters in string, notes fo HW1 answers
    char        = escape
                |~"\\" ~"\"" ~"'" ~"\n" any
    relop       = "<"|">"|"<="|"=="|">="|"!="
    addop       = "+" | "-"
    mulop       = "*" | "/" | "%"
    preop       = "-" | "!"
    keyword     = ("for" | "match" | "def" | "type" | "from" | "to" | "with" | "if" | "else" | "or" | "and" | "true" | "false" | "print") ~idrest
    escape		= "\\\\" | "\\\"" | "\\'" | "\\n" | "\\t"
                | "\\u{"hexDigit+"}"			-- codepoint
}`);

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
    return (`( Id: ${this.id} = ` + `( ${this.struct} ) )`);
  }
}

class FunctionDefinition extends Definition {
  constructor(_, id, _a, _b, body, _c) {
    super();
    this.id = id;
    this.body = body;
  }
  toString() {
    return (`( Func: ${this.id} = ${this.body} )`);
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

class Charlit {
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
  VarDef(_, id, _a, exp, _b) { return new VariableDefinition(_, id.tree(), _, exp.tree()); },
  StructDef(_, id, _a, struct, _b) { return new StructDefinition(_, id.tree(), _a, struct.tree(), _b); },
  FuncDef(_, id, _a, _b, body, _c) { return new FuncionDefinition(_, id.tree(), _a, _b, body.tree(), _c); },
  AssDef(_, type, _a, id, _b, exp, _c) { return new AssertDefinition(_, type.tree(), _a, id.tree(), _b, exp.tree(), _c); },
  ObjDef(_, id, _a, obj) { return new ObjectDefinition(_, id.tree(), _a, obj.tree()); },
  BinExp(left, op, right) { return new BinaryExpression(left.tree(), op.sourceString(), right.tree()); },
  UnaryExp(op, operand) { return new UnaryExpression(op.sourceString, operand.tree()); },
  ParensExp(p1, exp, p2) { return new ParensExpression(p1, exp.tree(), p2); },
  NumLit(value) { return new NumericLiteral(value.tree()); },
  IfEl(_, _a, cond1, _b, body1, _c, _d, _e, cond2, _f, _g, body2, _h, _i, _j, body3, _k) { return new IfElse(_, _a, cond1.tree(), _b, body1.tree(), _c, _d, _e, cond2.tree(), _f, _g, body2.tree(), _h, _i, _j, body3.tree(), _k); },
  Els(_, _a, exp1, _b, _c, body1, _d, _e, _f, body2, _g) { return new Else(_, _a, exp1.tree(), _b, _c, body1.tree(), _d, _e, _f, body2.tree(), _g); },
  MatchStmt(_, _a, exp, _b, _c, block) { return new Match(_, _a, exp.tree(), _b, _c, block.tree()); },
  MatchBlck(_, pattern, _a, stmt) { return new MatchBlock(_, pattern.tree(), _a, stmt.tree()); },
  MatchPat(exp) { return new MatchPattern(exp.tree()); },
  StrucId(id) { return new StructId(id.tree()); },
  Typee(type) { return new Type(type.tree()); },
  Prim(prim) { return new Primitive(prim.tree()); },
  Obj(openB, id, colon, exp, comma, lastId, lastColon, lastExp, lastCloseB) { return new Object(openB, id.tree(), colon, exp.tree(), comma, lastId.tree(), lastColon, lastExp.tree(), lastCloseB); },
});

// read args
// Parse
// constole.log(.ast())
