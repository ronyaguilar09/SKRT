const Type = require('./type');

module.exports = class CharLit {

  constructor(value) {
    this.value = value;
  }

  analyze(context) {
    this.type = Type.CHAR;
  }

  optimize() {
    return this;
  }

};
