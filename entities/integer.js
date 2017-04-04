const Type = require('./type');

module.exports = class Integer {
  constructor(value) {
    this.value = value;
    this.type = Type.INT;
  }
  toString() {
    return `Int: ${this.value}`;
  }

  analyze(context) {

  }
};
