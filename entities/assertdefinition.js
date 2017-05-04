module.exports = class AssertDefinition {
  constructor(type, id, exp) {
    this.assert = type;
    this.id = id;
    this.exp = exp;
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    this.exp.analyze(context);
    this.assert.analyze(context);
    this.id.analyze(context);
    this.exp.assertType = this.assert.type;
    context.addVariable(this.id, this.exp);

    if (this.assert.type !== this.exp.type.literal) {
      throw new Error('Type Does Not Match Assertion');
    }
  }

  optimize() {
    this.assert = this.assert.optimize();
    this.id = this.id.optimize();
    this.exp = this.exp.optimize();
    return this;
  }
};
