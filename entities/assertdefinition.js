class AssertDefinition {
  constructor(type, id, exp) {
    this.type = type;
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return (`( Var: ${this.id} ofType: ${this.type} = ${this.exp} )`);
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    return context.addVariable(this.id, this.exp);
  }
}
