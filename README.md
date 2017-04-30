![alt text](SKRTLOGOREADME.png "Logo Title")
## Introduction
A functional, immutable, and statically-typed language. Feels like JavaScript, works like OCaml. SKRT possesses powerful features such as Pattern Matching, Type Inference, First-Class Functions. SKRT out programs real quick, and whip onto the next project with skid marks.

# The Language
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

### Abstract Syntax Tree Examples
Below is an abstract syntax tree when we run "node skrt.js sampleSKRTCode.txt -a" in the terminal, when sampleSKRTCode.txt contains this siimple function of:
```
def add x y => {
    x + y
}
```
Here is the output of AST:
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

Next is an example of a definition without type assertion, and with type assertion. The code int the sampleSKRTCode.txt contains:
```
def int: x = 5;
def y = 1;
```
The output for the AST is below:
```
Program {
  body: 
   Body {
     statements: 
      [ Statement {
          statement: 
           Definition {
             typeOfDef: 
              AssertDefinition {
                assert: 
                 Type {
                   literal: Primitive { prim: Assert { type: 'int' } },
                   type: [Circular] },
                id: Id { name: 'x' },
                exp: 
                 TypeExpression {
                   exp: 
                    Type {
                      literal: Primitive { prim: Integer { value: '5' } },
                      type: [Circular] } } } } },
        Statement {
          statement: 
           Definition {
             typeOfDef: 
              VariableDefinition {
                id: Id { name: 'y' },
                exp: 
                 TypeExpression {
                   exp: 
                    Type {
                      literal: Primitive { prim: Integer { value: '1' } },
                      type: [Circular] } },
                type: Type { literal: 'any', type: [Circular] } } } } ] } }
```

## Example Programs

### Comments

```
~ This is a single line comment               JS Example #1
~| This is a multiple line comment            // This is a single line comment
    comments                                  /* This is a multiple line comment
    comments                                     More comments….
|~                                            /*
```

### Assignments

```
def int: x = 5;   ~Type Assertion            let x = 5;
def y = 1;
def x,y = 5,10;
```

### Printing
```
print(“Hello” + “ World”);                   console.log(“Hello” + “ World”);
```

### Function
```
def add x y => {                             function add (x, y) {
    x + y                                      return x + y
}                                            }
```

### Object Declaration

```
def obj = {                                 var car = {
    name: "John",                              type:"Fiat",
    age: 32                                    color:"white"
}                                            };
```

### Tuples

```
def tup = (“Max”,  21);                    tuple = [“Max”, 21];
```

### Recursion

```
def rec fib (n : int) : int list = {   function fibonacci(n) {
    match n with                          if (n < 2){        
    | 0 -> 0                                return 1;
    | 1 -> 1                              } else{
    | n -> fib (n-1) + fib (n-2)            return fibonacci(n-2) + fibonacci(n-1);
}                                         }
                                    }
```

### If Else Statements

```
def addOrSub x y z = {                     function addOrSub(x, y, z) {
    if  (x = 0) {                             if (x=0) {
        y + z;                                  return y + z;
    } else if (x = 1) {                       } else if (x = 1) {
        y - z;                                  return y-z;
    } else {                                  } else {
        print("Error");                         return;
    }                                      	  }
    									   {
}
```
