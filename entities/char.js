const Type = require('./type');

module.exports = class Char {

  constructor(value) {
    this.value = value;
  }

  toString() {
    return `${this.value}`;
  }

  analyze(context) {

  }
};
