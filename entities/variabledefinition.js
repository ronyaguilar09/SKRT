const Type = require('./type');

module.exports = class VariableDefinition {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return `( Var: ${this.id} = ${this.exp} )`;
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    return context.addVariable(this.id, this.exp); // Not sure
  }

};
