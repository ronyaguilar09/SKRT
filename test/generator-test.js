const assert = require('assert');
const parse = require('../parser');
require('../generator');

describe('SKRT Generator', () => {
  it('def add z y => { z + y }', () => {
    const program = parse('def add z y => { z + y }');
    console.log(program);
    program.gen();
    const expected = 'function add_1(z_2, y_3) { z_2 + y_3 }';
    assert.equal(console.string, expected);
  });

  it('def x = 5;', () => {
    const program = parse('def x = 5;');
    const s = program.gen();
    const expected = 'let x_4 = (5);';
    assert.equal(console.string, expected);
  });


  it('def sub x y => { x - y }', () => {
    const program = parse('def sub x y => { x - y }');
    console.log(program);
    program.gen();
    const expected = 'function sub_5(x_4, y_3) { x_4 - y_3 }';
    assert.equal(console.string, expected);
  });

  it('def mult x y => { x * y }', () => {
    const program = parse('def mult x y => { x * y }');
    console.log(program);
    program.gen();
    const expected = 'function mult_6(x_4, y_3) { x_4 * y_3 }';
    assert.equal(console.string, expected);
  });

  it('def divide x y => { x / y }', () => {
    const program = parse('def divide x y => { x / y }');
    console.log(program);
    program.gen();
    const expected = 'function divide_7(x_4, y_3) { x_4 / y_3 }';
    assert.equal(console.string, expected);
  });

  it('def mod x y => { x % y }', () => {
    const program = parse('def mod x y => { x % y }');
    console.log(program);
    program.gen();
    const expected = 'function mod_8(x_4, y_3) { x_4 % y_3 }';
    assert.equal(console.string, expected);
  });

  it('print("Hello" + "World");', () => {
    const program = parse('print("Hello" + "World");');
    console.log(program);
    program.gen();
    const expected = 'console.log("Hello" + "World");';
    assert.equal(console.string, expected);
  });

  it('def tuple = (3,5,"hello");', () => {
    const program = parse('def tuple = (3,5,"hello");');
    console.log(program);
    program.gen();
    const expected = 'let tuple_9 = ((3,5,"hello"));';
    assert.equal(console.string, expected);
  });

  it('def list = [1,2,3,4,5];', () => {
    const program = parse('def list = [1,2,3,4,5];');
    console.log(program);
    program.gen();
    const expected = 'let list_10 = ([1,2,3,4,5]);';
    assert.equal(console.string, expected);
  });

  it('def mirror x => { if (x == 0) { x } else if ( x == 1 ) { x + x } else { "0" }}', () => {
    const program = parse('def mirror x => { if (x == 0) { x } else if ( x == 1 ) { x + x } else { "0" }}');
    console.log(program);
    program.gen();
    const expected = 'function mirror_11(x_4) { if (x_4 == 0) { x_4 } else if (x_4 == 1) {x_4 + x_4 } else { "0" } }';
    assert.equal(console.string, expected);
  });
});
