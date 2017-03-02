const ohm = require('ohm-js');

const skrtGrammar = ohm.grammar(`SKRT {
    Program     =  Body
    Body        =  Stmts*
    Stmts       =  Def
                |  IfElse
                |  For
                |  Exp
    Def         = VarDef | FunDef | CamlDef | ObjDef | StructDef
    StructDef	= "def" StructId "=" StructId ";"
    VarDef      = "def" id "=" Exp ";"
    FunDef      = "def" id "=>" "{" Body "}"
    CamlDef     = "def" Type ":" id "=" Exp";" // dont restrict just to primitive types here
    ObjDef     = "type" id "=" Obj
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
    Type		= Prim | Tuple | List
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
    char		= escape
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
    constructor()
}

const semantics = skrtGrammar.createSemantics().addOperation('tree',{
    Program(body) {return new Program(body.tree());},
    Body(stmt) {return new Body(stmt.tree());},
    Stmts(def,if,for,exp) {return }
})
