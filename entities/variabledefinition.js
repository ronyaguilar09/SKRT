class VariableDefinition {
  constructor(_, id, _a, exp, _b) {
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return (`( Var: ${this.id} = ${this.exp} )`);
  }
}
