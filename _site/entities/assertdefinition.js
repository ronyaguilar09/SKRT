class AssertDefinition {
  constructor(_, type, _a, id, _b, exp, _c) {
    this.type = type;
    this.id = id;
    this.exp = exp;
  }
  toString() {
    return (`( Var: ${this.id} ofType: ${this.type} = ${this.exp} )`);
  }
}
