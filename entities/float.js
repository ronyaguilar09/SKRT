const Type = require('./type');

module.exports = class Float {

  constructor(value, value2) {
    this.value = `${value}.${value2}`;
  }

  analyze(context) {
    this.type = Type.FLOAT;
  }

  optimize() {
    return this;
  }

};
