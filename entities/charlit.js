const Type = require('./type');

module.exports = class CharLit {

  constructor(value) {
    this.value = value;
  }

  toString() {
    return `Char: ${this.value}`;
  }

  analyze(context) {
    this.type = Type.CHAR;
  }

  optimize() {
    return this;
  }

};
