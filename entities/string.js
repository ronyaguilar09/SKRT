const Type = require('./type');

module.exports = class String {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    this.type = Type.STRING;
  }

  optimize() {
    return this;
  }

 };
