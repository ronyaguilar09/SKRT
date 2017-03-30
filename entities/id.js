const Type = require('./type');

class Id {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return (`Id: ${this.value.join('')}`);
  }
  analyze(context) {
    this.type = Type.ID;
  }
}
