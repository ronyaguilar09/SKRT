const Type = require('./type');

module.exports = class BooleanLiteral {

  constructor(value) {
    this.value = value;
  }

  toString() {
    return `Bool: ${this.value}`;
  }

  analyze(context) {
    this.type = Type.BOOL;
  }

  optimize() {
    return this;
  }

};
