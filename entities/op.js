const Type = require('./type');

module.exports = class Op {
  constructor(op) {
    this.operator = op;
  }

  toString() {
    return ` ${this.operator} `;
  }

  analyze(context) {

  }

  optimize() {
    return this;
  }

};
