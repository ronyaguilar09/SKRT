const ohm = require('../node_modules/ohm-js');
const assert = require('assert');

const fs = require('fs');

const contents = fs.readFileSync('skrt.ohm');
const myGrammar = ohm.grammar(contents);

let userInput = 'def x = 5;';

describe('One Line Expression Test:', () => {
  it("should return true for 'def x = 5'", () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});

userInput = 'def filip = 69;';

describe('One Line Expression Test:', () => {
  it("should return true for 'def filip = 69'", () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});

userInput = `def x = 5;
             def y = x;
             x + y`;

describe('Multi Line Expression Test:', () => {
  it('should return true for `def x = 5;\n def y = x;\n x + y`', () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});

userInput = `for x from 0 to 10 {
                x + x
            }`;

describe('For expressions', () => {
  it('should return true for a "for" loop statement', () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});

userInput = `def add => {
                1+2
            }`;

describe('Function declaration', () => {
  it('should return true for a function declaration', () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});

userInput = `type Car = {
                owner : Rony,
                price : 10000000,
            }`;

describe('Type/Class declaration', () => {
  it('should return true for a Type/Class declaration', () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});

userInput = `if(y<0){
                def x = 1;
            } else if(y < 10){
                def x = 2;
            }`;

describe('if and else statements', () => {
  it('should return true for a if statement', () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});

userInput = `match(x) with
            | _ => 1
            | 1 => 2`;

describe('match statements', () => {
  it('should return true for a match statement', () => {
    const m = myGrammar.match(userInput);
    assert.equal(true, m.succeeded());
  });
});
