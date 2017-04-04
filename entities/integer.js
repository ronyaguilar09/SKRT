const Type = require('./type');

module.exports = class Integer {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `Int: ${this.value}`;
  }

  analyze(context) {
    this.type = Type.INT;
  }
};
