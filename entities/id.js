const Type = require('./type');

module.exports = class Id {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `Id: ${this.value.join('')}`;
  }
  analyze(context) {
    this.type = Type.ID;
  }
};
