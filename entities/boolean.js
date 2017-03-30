const Type = require('./type');

class Boolean {

  constructor(value) {
    this.value = value;
  }

  toString() {
    return (`Bool: ${this.value}`);
  }

  analyze(context) {
    this.type = Type.BOOL
  }
}
