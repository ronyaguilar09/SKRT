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
