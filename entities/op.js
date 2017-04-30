const Type = require('./type');

module.exports = class Op {
  constructor(op) {
    this.operator = op;
  }

  analyze() {

  }

  optimize() {
    return this;
  }

};
