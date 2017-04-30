const Type = require('./type');

module.exports = class String {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `String: ${this.value}`;
  }

  analyze(context) {
    this.type = Type.STRING;
  }

  optimize() {
    return this;
  }

 };
