## Introduction
A functional, immutable, and statically-typed language. Feels like JavaScript, works like OCaml. SKRT possesses powerful features such as Pattern Matching, Type Inference, First-Class Functions. SKRT out programs real quick, and whip onto the next project with skid marks.

## List of Features

- Type Assertions and Inference
- Loosely Object-Oriented
- First-Class Functions
- Pattern Matching
- Recursion
- .SKRT file extension
- Tuples
- Loops
- Destructuring

### Macrosyntax
```

  Program     =  Body
  Body        =  (Stmts)+
  Stmts       =  Def                      -- assignment
              |  If                       
              |  For
              |  Exp
              |  Match
Def           = "def" id "=" Exp";"
              | "def" id "=> {" Body "}"
              | "def" Prim ":" id "=" Exp";"
              | "type" id "= {" Obj "}"
If            = "if""("Exp")" "{"Body"}"("else if""("Exp")" "{" Body "}")*
              | "if""("Exp")" "{"Body"}"("else" {" Body "}")?
For           = "for" id "from" Exp "to" Exp "{"Body"}"
Match         = "match" "("Exp")""watch""\n" MatchBlock
MatchBlock    = ("|" MatchPat "=>" Stmt)+
MatchPat      = Exp|"_"
Exp           = Exp1("or" Exp)*
Exp1          = Exp2("and" Exp1)*
Exp2          = Exp3(relop Exp2)*
Exp3          = Exp4(addop Exp3)*
Exp4          = Exp5(mulop Exp4)*
Exp5          = Exp6(preop Exp6)?
Exp6          = Exp7("**" Exp7)*
Exp7          = Exp8("." Exp8)?
Exp8          = Prim ? "("Exp")"
Prim          = bool|int|string|float|id|char|obj
```
## Features

### Comments

```
~ This is a single line comment
~| This is a multiple line comment
    comments
    comments
|~
```

### Assignments

```
def int: x = 5;   ~Type Assertion
def y = 1;
def x,y = 5,10;
```

### Printing
```
print(“Hello” + “ World”);
```

### Function
```
def add x y = {
    x + y;
}
```

### Object Declaration

```
type obj = {
    name: "John",
    age: 32
}
```

### Tuples

```
def tup = (“Max”,  21);
```

### Recursion

```
def rec fib (n : int) : int list = {
    match n with
    | 0 -> 0
    | 1 -> 1
    | n -> fib (n-1) + fib (n-2)
};
```

### If Else Statements
```
Def addOrSub x y z = {
    if  (x = 0) {
        y + z;
    } else if (x = 1) {
        y - z;
    } else {
        print("Error");
    }
}
```
