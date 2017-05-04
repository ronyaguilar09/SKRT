const Type = require('./type');

module.exports = class VariableDefinition {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
    this.type = Type.ANY;
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id.name);
    this.exp.analyze(context);
    this.type = this.exp.type;
    this.id.analyze(context);
    this.exp.assertType = Type.ANY.literal;
    context.addVariable(this.id, this.exp);
  }

  optimize() {
    this.id = this.id.optimize();
    this.exp = this.exp.optimize();
    this.type = this.type.optimize();
    return this;
  }

};
