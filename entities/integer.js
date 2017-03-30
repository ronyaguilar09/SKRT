const Type = require('./type');

class Integer {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return (`Int: ${this.value.join('')}`);
  }

  analyze(context) {
    this.type = Type.INT;
  }
}
