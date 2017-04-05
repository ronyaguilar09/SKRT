const Type = require('./type');

module.exports = class VariableDefinition {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
    this.type = Type.ANY;
    console.log(this.id);
  }
  toString() {
    return `( Var: ${this.id} = ${this.exp} )`;
  }

  analyze(context) {
    console.log(`in var def analysis: ${context}`);
    context.variableMustNotBeAlreadyDeclared(this.id.name);
    context.addVariable(this.id.name, this.exp);
    this.id.analyze(context);
    this.exp.analyze(context); // Not sure
  }

};
