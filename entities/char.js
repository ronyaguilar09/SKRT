const Type = require('.type');

class Char {

  constructor(value) {
    this.value = value;
  }

  toString() {
    return (`${this.value}`);
  }

  analyze(context) {
    this.type = Type.CHAR;
  }
}
