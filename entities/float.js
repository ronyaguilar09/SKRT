const Type = require('./type');

module.exports = class Float {

  constructor(value, value2) {
    this.value = `${value}.${value2}`;
  }

  toString() {
    return `Float: ${this.value1.join('')}.${this.value2.join('')}`;
  }

  analyze(context) {
    this.type = Type.FLOAT;
  }
};
