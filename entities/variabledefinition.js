const Type = require('./type');

module.exports = class VariableDefinition {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
    this.type = Type.ANY;
  }
  toString() {
    return `(Var: ${this.id} = ${this.exp} )`;
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id.name);
    this.exp.analyze(context);
    this.type = this.exp.type;
    context.addVariable(this.id, this.exp);
    this.id.analyze(context);
  }

  optimize() {
    this.id = this.id.optimize();
    this.exp = this.exp.optimize();
    this.type = this.type.optimize();
    return this;
  }

};
