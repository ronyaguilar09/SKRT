// const ohm = require('../node_modules/ohm-js');
// const assert = require('assert');
// const fs = require('fs');
// const parse = require('../parser');
// require('../generator');
// const sinon = require('sinon');
//
// const userInput = 'def x = 5;';
//
// /* eslint-disable */
// describe('Generate skrt def ', () => {
//   it("should return true for 'def x = 5'", () => {
//     var stub = sinon.stub(),
//         opts = { call: function (msg) { console.log(msg); } };
//     stub.gen().returns("World");
//
//     // assert(callback.called);
//   });
// });

const assert = require('assert');
const parse = require('../parser');
require('../generator');

describe('SKRT Generator', () => {
  it('def add x2 y2 => { x2 + y2 }', () => {
    const program = parse('def add x2 y2 => { x2 + y2 }');
    program.gen();
    const expected = 'function add_1(x2_2, y2_3) {x2_2 + y2_3}';
    assert.equal(console.string, expected);
  });

  it('def x = 5;', () => {
    const program = parse('def x = 5');
    program.gen();
    const expected = 'let x = 5;';
    assert.equal(console.string, expected);
  });

  it('def add x2 y2 => { x2 + y2 }', () => {
    const program = parse('def add x2 y2 => { x2 + y2 }');
    program.gen();
    const expected = 'function add_1(x2_2, y2_3) {x2_2 + y2_3}';
    assert.equal(console.string, expected);
  });
});
