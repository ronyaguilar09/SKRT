module.exports = class ParensExpression extends Expression {

  constructor(p1, exp, p2) {
    super();
    this.p1 = p1;
    this.exp = exp;
    this.p2 = p2;
  }

  toString() {
    return `( ${this.exp} )`;
  }

  analyze(context) {
    this.exp.analyze(context);
  }

  optimize() {
    this.exp = this.exp.optimize();
    return this;
  }
};
