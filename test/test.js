const ohm = require('../node_modules/ohm-js');
var assert = require('assert');

const fs = require('fs');
const contents = fs.readFileSync('skrt.ohm');
const myGrammar = ohm.grammar(contents);

var userInput = 'def x = 5;';
var m = myGrammar.match(userInput);

describe('One Line Expression Test:', function () {
    it("should return true for 'def x = 5'", function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});

userInput = 'def filip = 69;';
m = myGrammar.match(userInput);

describe('One Line Expression Test:', function () {
    it("should return true for 'def filip = 69'", function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});

userInput = `def x = 5;
             def y = x;
             x + y`;
m = myGrammar.match(userInput);

describe('Multi Line Expression Test:', function () {
    it("should return true for `def x = 5;\n def y = x;\n x + y`", function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});

userInput = `for x from 0 to 10 {
                x + x
            }`;
m = myGrammar.match(userInput);

describe('For expressions', function () {
    it(`should return true for a "for" loop statement`, function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});

userInput = `def add => {
                1+2
            }`;
m = myGrammar.match(userInput);

describe('Function declaration', function () {
    it(`should return true for a function declaration`, function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});

userInput = `type Car = {
                owner : Rony,
                price : 10000000,
            }`;
m = myGrammar.match(userInput);
describe('Type/Class declaration', function () {
    it(`should return true for a Type/Class declaration`, function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});

userInput = `if(y<0){
                def x = 1;
            } else if(y < 10){
                def x = 2;
            }`;
m = myGrammar.match(userInput);
describe('if and else statements', function () {
    it(`should return true for a if statement`, function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});

userInput = `match(x) with
            | _ => 1
            | 1 => 2`
m = myGrammar.match(userInput);
describe('match statements', function () {
    it(`should return true for a match statement`, function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});
