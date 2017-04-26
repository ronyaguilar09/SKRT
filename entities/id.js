const Type = require('./type');

module.exports = class Id {
  constructor(name, rest) {
    this.name = name + rest;
  }
  toString() {
    return `Id: ${this.name}`;
  }
  analyze(context) {
    this.type = Type.ID;
    // this.value = context.lookupVariable(this.name);
  }
};
