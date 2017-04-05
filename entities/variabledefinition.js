const Type = require('./type');

module.exports = class VariableDefinition {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
    this.type = Type.ANY;
  }
  toString() {
    return `( Var: ${this.id} = ${this.exp} )`;
  }

  analyze(context) {
    console.log(`in var def analysis: ${context}`);
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this.exp);
    this.exp.analyze(context); // Not sure
  }

};
