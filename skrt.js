const ohm = require('ohm-js');

const skrtGrammar = ohm.grammar(`SKRT {
    Program     =  Body
    Body        =  Stmts*
    Stmts       =  Def
                |  IfElse
                |  For
                |  Exp
    Def         = VarDef | FunDef | CamlDef | ObjDef | StructDef
    StructDef 	= "def" StructId "=" StructId ";"
    VarDef      = "def" id "=" Exp ";"
    FunDef      = "def" id "=>" "{" Body "}"
    CamlDef     = "def" Type ":" id "=" Exp";" // dont restrict just to primitive types here
    ObjDef      = "type" id "=" Obj
    IfElse      = "if" "(" Exp ")" "{" Body "}" ( "else if" "(" Exp ")" "{" Body "}" )* ("else" "{" Body "}")? --ifelse
    			  |"if" "(" Exp ")" "{" Body "}" ("else" "{" Body "}")? 									   --else
    For         = "for" id "from" Exp "to" Exp "{" Body "}"
    Match       = "match" "(" Exp ")" "with" MatchBlock
    MatchBlock  = ("|" MatchPat "=>" Stmts)+
    MatchPat    = Exp|"_"
    StructId	= id | Tuple
    Exp         = Exp1("or" Exp)*
    Exp1        = Exp2("and" Exp1)*
    Exp2        = Exp3(relop Exp2)*
    Exp3        = Exp4(addop Exp3)*
    Exp4        = Exp5(mulop Exp4)*
    Exp5        = Exp6(preop Exp6)?
    Exp6        = Exp7("**" Exp7)*
    Exp7        = Exp8("." Exp8)?
    Exp8        = Type | Match | Exp9
    Exp9 	    = "(" Exp ")"
    Type	    = Prim | Tuple | List
    Prim        = bool|int|stringlit|float|id|charlit
    Obj         = "{" (~(id ":" Exp "}" ) (id ":" Exp "," ))* (id ":" Exp "}" )
    Tuple       = "(" (~(Exp ")")(Exp","))* (Exp ")")
    List		= "[" (~(Exp ")")(Exp ","))* (Exp "]")

    bool        = "true" | "false"
    int         = digit+
    stringlit   = "\"" (char|"\'")* "\""
    float       = digit* "." digit+
    id          = ~keyword letter idrest*
    idrest		= "_" | alnum
    charlit     = "\'"any"\'" // characters in string, notes fo HW1 answers
    char	    = escape
    			  |~"\\" ~"\"" ~"'" ~"\n" any
    relop       = "<"|">"|"<="|"=="|">="|"!="
    addop       = "+" | "-"
    mulop       = "*" | "/" | "%"
    preop       = "-" | "!"
    keyword     = ("for" | "match" | "def" | "type" | "from" | "to" | "with" | "if" | "else" | "or" | "and" | "true" | "false" | "print") ~idrest
    escape		= "\\\\" | "\\\"" | "\\'" | "\\n" | "\\t"
    		    | "\\u{"hexDigit+"}"								-- codepoint
}`);

class Program {
    constuctor(body){
        this.body = body;
    }
}

class Body {
    constructor(stmts){
        this.statement = stmts;
    }
}

class Statement {
    constructor(def,ifelse,forloop,exp){
        this.def = def;
        this.if = ifelse;
        this.for = forloop;
        this.exp = exp;
    }
}

class Definition {

}

class VariableDefinition extends Definition{
    constructor(_, id, _, exp, _){
        super();
        this.id = id;
        this.exp = exp;
    }
}

class StructDefinition extends Definition{
    constructor(_,id,_,struct,_){
        super();
        this.id = id;
        this.struct = struct;
    }
}

class FunctionDefinition extends Definition {
    constructor(_,id,_,_,body,_){
        super();
        this.id = id;
        this.body = body;
    }
}

class AssertDefinition extends Definition {
    constructor(_,type,_,id,_,exp,_){
        super();
        this.type = type;
        this.id = id;
        this.body = body;
    }
}

class ObjectDefinition extends Definition {
    constructor(_,id,_,obj){
        super();
        this.id = id;
        this.obj = obj;
    }
}

class Expression {
}

class BinaryExpression  extends Expression {
	constructor(left, op, right) {
  	super();
  	this.left = left;
  	this.op = op;
  	this. right = right;
  }
}

class UnaryExpression  extends Expression {
	constructor(op, operand) {
  	super();
  	this.op = op;
  	this. operand = operand;
  }
}

class NumericLiteral  extends Expression {
	constructor(value) {
  	super();
  	this.value = value;
  }
}

class IfElse {
    constructor(_,_,cond1,_body1,_,_,_,cond2,_,_,body2,_,_,_,body3,_){
        this.cond1 = cond1;
        this.body1 = body1;
        this.cond2 = cond2;
        this.body2 = body2;
        this.body3 = body3;
    }
}

class Else {
    constructor(_,_,exp1,_,_,body1,_,_,_,body2,_){
        this.exp1 = exp1;
        this.body1 = body1;
        this.body2 = body2;
    }
}

class Match {
    constructor(_,_,exp,_,_,mblock){
        this.exp = exp;
        this.block = mblock;
    }
}

class MatchBlock {
    constructor(_,pattern,_,stmt){
        this.pattern = pattern;
        this.stmt = stmt;
    }
}

class MatchPattern {
    constructor(exp){
        this.exp = exp;
    }
}

class StructId {
    constructor(id){
        this.id = id;
    }
}

class Type {
    constructor(type){
        this.type = type;
    }
}

class Primitive{
    constructor(prim){
        this.value = prim;
    }
}
// Objects, Tuples and Lists, how do we store into constructor?
class Object {
    constructor(_)
}

const semantics = skrtGrammar.createSemantics().addOperation('tree',{
    Program(body) {return new Program(body.tree());},
    Body(stmt) {return new Body(stmt.tree());},
    Stmts(def,if,for,exp) {return }
})
