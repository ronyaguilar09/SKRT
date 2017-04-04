module.exports = class TypeExpression {
  constructor(exp) {
    // super();
    this.exp = exp;
  }
  toString() {
    return ` (TypeExpression: ${this.exp}) `;
  }
  analyze(context) {
    this.exp.analyze(context);
  }
};
