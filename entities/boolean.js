const Type = require('./type');

module.exports = class BooleanLiteral {

  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    this.type = Type.BOOL;
  }

  optimize() {
    return this;
  }

};
