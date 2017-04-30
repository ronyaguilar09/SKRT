const Type = require('./type');

module.exports = class Op {
  constructor(op) {
    this.operator = op;
  }

  toString() {
    return ` (Op: ${this.operator}) `;
  }

  analyze(context) {

  }

  optimize() {
    return this;
  }

};
