const Type = require('./type');

module.exports = class Integer {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `Int: ${this.value}`;
  }

  analyze(context) {
    console.log(`reached integer without errors: ${context}`);
    this.type = Type.INT;
  }
};
