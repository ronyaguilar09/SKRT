![alt text](SKRTLOGOREADME.png "Logo Title")
## Introduction
A functional, immutable, and statically-typed language. Feels like JavaScript, works like OCaml. SKRT possesses powerful features such as Pattern Matching, Type Inference, First-Class Functions. SKRT out programs real quick, and whip onto the next project with skid marks.

## List of Features

- Type Assertions and Inference
- Loosely Object-Oriented
- First-Class Functions
- Pattern Matching
- Recursion
- Tuples
- Destructuring

### Macrosyntax
```
    Program     =  Body
    Body        =  Stmts*
    Stmts       =  Def
                |  If
                |  For
                |  Exp
                |  Match
    Def         = VarDef | FunDef | CamlDef | TypeDef
    VarDef      = "def" id "=" Exp ";"
    FunDef      = "def" id "=>" "{" Body "}"
    CamlDef     = "def" Prim ":" id "=" Exp";"
    TypeDef     = "type" id "=" "{" Obj "}"
    If          = IfElse | Else
    Else        = "if" "(" Exp ")" "{" Body "}" ("else" "{" Body "}")?
    IfElse	    = "if" "(" Exp ")" "{" Body "}" ( "else if" "(" Exp ")" "{" Body "}" )*
    For         = "for" id "from" Exp "to" Exp "{" Body "}"
    Match       = "match" "(" Exp ")" "with" "\n" MatchBlock
    MatchBlock  = ("|" MatchPat "=>" Stmts)+
    MatchPat    = Exp|"_"
    Exp         = Exp1("or" Exp)*
    Exp1        = Exp2("and" Exp1)*
    Exp2        = Exp3(relop Exp2)*
    Exp3        = Exp4(addop Exp3)*
    Exp4        = Exp5(mulop Exp4)*
    Exp5        = Exp6(preop Exp6)?
    Exp6        = Exp7("**" Exp7)*
    Exp7        = Exp8("." Exp8)?
    Exp8        = Prim | Exp9
    Exp9 		    = "(" Exp ")"
    Prim        = bool|int|string|float|id|char
    Obj         = "{" (id ":" Exp ",")* "}"

    bool        = "true" | "false"
    int         = digit+
    string      = "\"" any+ "\""
    float       = digit* "." digit+
    id          = ~keyword ~string alnum+
    char        = any
    relop       = "<"|">"|"<="|"=="|">="|"!="
    addop       = "+" | "-"
    mulop       = "*" | "/" | "%"
    preop       = "-" | "!"
    keyword     = "for" | "match" | "def" | "type" | "from" | "to" | "with" | "if" | "else" | "or" | "and" | "true" | "false" | "print"
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
