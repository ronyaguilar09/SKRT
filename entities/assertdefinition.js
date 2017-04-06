module.exports = class AssertDefinition {
  constructor(type, id, exp) {
    this.assert = type;
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return `( Var: ${this.id} ofType: ${this.assert} = ${this.exp} )`;
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this.exp);
    this.exp.analyze(context);
    this.assert.analyze(context);
    this.id.analyze(context);
    if (this.assert.type !== this.exp.type.literal) {
      throw new Error('Type Does Not Match Assertion');
    }
  }
};
