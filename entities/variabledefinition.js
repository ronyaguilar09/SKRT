const Type = require('./type');

class VariableDefinition {
  constructor(_, id, _a, exp, _b) {
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return (`( Var: ${this.id} = ${this.exp} )`);
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    return context.addVariable(this.id, this.exp); // Not sure
  }

}
