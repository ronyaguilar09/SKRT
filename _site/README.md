![alt text](SKRTLOGOREADME.png "Logo Title")
## SKRT Introduction
A functional, immutable, and statically-typed language. Feels like JavaScript, works like OCaml. SKRT possesses powerful features such as Pattern Matching, Type Inference, First-Class Functions. SKRT out programs real quick, and whip onto the next project with skid marks.

### The Language
The language is descired in more detail at the [language home page](https://ronyaguilar09.github.io/SKRT/)

## List of Features
- Type Assertions and Inference
- Loosely Object-Oriented
- First-Class Functions
- Pattern Matching
- Recursion
- Tuples
- Destructuring

### Macrosyntax -> [Link to Full SKRT Grammar](https://github.com/ronyaguilar09/SKRT/blob/master/skrt.ohm)
```
    Program     =  Body
    Body        =  Stmts*
    Stmts       =  Def
                |  IfElse
                |  For
                |  Exp
                |  Print
    Def         = VarDef | FunDef | CamlDef | ObjDef | StructDef
    StructDef	= "def" StructId "=" (Tuple|id) ";"
    VarDef      = "def" id "=" Exp ";"
    FunDef      = "def" id id* "=>" "{" Body "}"
    CamlDef     = "def" Type ":" id "=" Exp";"
    ObjDef      = "type" id "=" Obj ";"
    Print       = "print" "(" Exp ")" ";"
    IfElse      = "if" "(" Exp ")" "{" Body "}" ( "else if" "(" Exp ")" "{" Body "}" )* ("else" "{" Body "}")?
    For         = "for" id "from" Exp "to" Exp "{" Body "}"
    Match       = "match" "(" Exp ")" "with" MatchBlock
    FunCall     = id Arg* ";"
    Arg         = (id | Exp)
    //Args        = ListOf<Arg, ",">
    MatchBlock  = ("|" MatchPat "=>" Stmts)+
    MatchPat    = Exp| wild
    StructId	= id | Tuple
    Exp         = Exp2 logop Exp             -- binary
                | Exp2
    Exp2        = Exp3 relop Exp2             -- binary
                | Exp3
    Exp3        = Exp4 addop Exp3             -- binary
                | Exp4
    Exp4        = Exp5 mulop Exp4             -- binary
                | Exp5
    Exp5        = Exp6 preop Exp6             -- binary
                | Exp6
    Exp6        = Exp7 exop Exp7              -- binary
                | Exp7
    Exp7        = Exp8 dotop Exp8             -- binary
                | Exp8
    Exp8        = FunCall | Type | Match | Exp9
    Exp9 	    = "(" Exp ")"                   -- parens
    Type		= Prim | Tuple | List
    Prim        = assert | bool|int|id|stringlit|float|charlit
    Obj         = "{" (~(id ":" Exp "}" ) (id ":" Exp "," ))* (id ":" Exp "}" )
    Tuple       = "(" (~(Exp ")")(Exp","))* (Exp ")")
    List		= "[" (~(Exp ")")(Exp ","))* (Exp "]")
```

### Microsyntax -> [Link to Full SKRT Grammar](https://github.com/ronyaguilar09/SKRT/blob/master/skrt.ohm)
```
    assert		= "int" | "float" | "string" | "char" | "bool"
    bool        = "true" | "false"
    int         = digit+
    stringlit   = "\"" (char|"\'")* "\""
    float       = digit* "." digit+
    id          = ~keyword letter idrest*
    idrest		= "_" | alnum
    charlit     = "\'"any"\'" // characters in string, notes fo HW1 answers
    char		= escape
    			 |~"\\" ~"\"" ~"'" ~"\n" any
    logop       = "and" | "or"
    relop       = "<"|">"|"<="|"=="|">="|"!="
    addop       = "+" | "-"
    mulop       = "*" | "/" | "%"
    preop       = "-" | "!"
    exop        = "**"
    dotop       = "."
    wild        = "_"
    keyword     = ("for" | "match" | "def" | "type" | "from" | "to" | "with" | "if" | "else" | "or" | "and" | "true" | "false" | "print") ~idrest
    escape		= "\\\\" | "\\\"" | "\\'" | "\\n" | "\\t"
    			| "\\u{"hexDigit+"}"
```
# The SKRT Compiler
## Abstract Syntax Tree Examples
The SKRT Compiler reads a SKRT prohram from a .skrt file and allows for 3 output options. The first option is "-a" which displays the abstarct syntax tree for the .skrt file and then stops. The second option is "-i" which generates and shows the decorated abstract syntax tree and then stops. Finally, the third option is "-o" which turns on the optimizations we have implemeneted.
Below is an example program named sampleSKRTCode.txt:
```
def add x y => {
    x + y
}
```
In the terminal, calling:
```
$ node skrt.js sampleSKRTCode.txt -a
```
produces the AST:
```
Program {
  body:
   Body {
     statements:
      [ Statement {
          statement:
           Definition {
             typeOfDef:
              FunctionDefinition {
                id: Id { name: 'add' },
                params: [ Id { name: 'x' }, Id { name: 'y' } ],
                body:
                 Body {
                   statements:
                    [ Statement {
                        statement:
                         BinaryExpression {
                           left:
                            TypeExpression {
                              exp:
                               Type {
                                 literal: Primitive { prim: Id { name: 'x' } },
                                 type: [Circular] } },
                           op: Op { operator: '+' },
                           right:
                            TypeExpression {
                              exp:
                               Type {
                                 literal: Primitive { prim: Id { name: 'y' } },
                                 type: [Circular] } } } } ] } } } } ] } }
```
Next, calling:
```
$ node skrt.js sampleSKRTCode.txt -i
```
performs the semantic analysis and writes out the decorated abstarct synatx tree:

```
Program {
  body:
   Body {
     statements:
      [ Statement {
          statement:
           Definition {
             typeOfDef:
              FunctionDefinition {
                id: Id { name: 'add', type: Type { literal: 'id', type: [Circular] } },
                params:
                 [ Id { name: 'x', type: Type { literal: 'id', type: [Circular] } },
                   Id { name: 'y', type: Type { literal: 'id', type: [Circular] } } ],
                body:
                 Body {
                   statements:
                    [ Statement {
                        statement:
                         BinaryExpression {
                           left:
                            TypeExpression {
                              exp:
                               Type {
                                 literal:
                                  Primitive {
                                    prim: Id { name: 'x', type: Type { literal: 'id', type: [Circular] } },
                                    type: Type { literal: 'id', type: [Circular] },
                                    name: 'x' },
                                 type: Type { literal: 'id', type: [Circular] },
                                 name: 'x' },
                              type: Type { literal: 'id', type: [Circular] },
                              name: 'x' },
                           op: Op { operator: '+' },
                           right:
                            TypeExpression {
                              exp:
                               Type {
                                 literal: Primitive { prim: Id { name: 'y' } },
                                 type: [Circular] } },
                           type: Type { literal: 'any', type: [Circular] } } } ] },
                localContext:
                 AnalysisContext {
                   parent:
                    AnalysisContext {
                      parent: null,
                      variables: { add: [Circular] },
                      currentFunction: null,
                      inLoop: false },
                   variables:
                    { x: Type { literal: 'any', type: [Circular] },
                      y: Type { literal: 'any', type: [Circular] } },
                   currentFunction: null,
                   inLoop: false } } } } ] } }
```
Finally, here is the JavaScript equivalent of the program:

```
function add_1(x_2, y_3) {
    x_2 + y_3
}
```

The example above does not optimize, however, here is another example:

```
def x = 1;
if(  3 < 2) {
    "true"
} else if (x == 1){
    1 + 2
} else {
    "false"
}
```
When using the "-o" optimization flag when calling
```
$ node skrt.js sampleSKRTCode.txt -o
```
the JavaScript equivalent would be:
```
let x_1 = (1);
if (3 < 2) {
    "true"
} else if (x_1 == 1) {
    1 + 2 
}
```
