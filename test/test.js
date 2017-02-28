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
             x + y`
m = myGrammar.match(userInput);

describe('Multi Line Expression Test:', function () {
    it("should return true for `def x = 5;\n def y = x;\n x + y`", function () {
        const m = myGrammar.match(userInput);
        assert.equal(true, m.succeeded());
    });
});
