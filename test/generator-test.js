const ohm = require('../node_modules/ohm-js');
const assert = require('assert');
const fs = require('fs');
const parse = require('../parser');
require('../generator');

const userInput = 'def x = 5;';

/* eslint-disable */
describe('Generate skrt def ', () => {
  it("should return true for 'def x = 5'", () => {
    const program = parse(userInput);

    assert(callback.called);
  });
});
