const Type = require('./type');

module.exports = class Id {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return `Id: ${this.name}`;
  }

  analyze(context) {
    this.type = Type.ID;
    // this.value = context.lookupVariable(this.name);
  }

  optimize() {
    return this;
  }

};
