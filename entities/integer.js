const Type = require('./type');

module.exports = class Integer {
  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    this.type = Type.INT;
  }

  optimize() {
    return this;
  }

};
