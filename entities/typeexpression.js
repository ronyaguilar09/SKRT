module.exports = class TypeExpression {
  constructor(exp) {
    // super();
    this.exp = exp;
  }
  toString() {
    return ` (TypeExpression: ${this.exp}) `;
  }
  analyze(context) {
    console.log(`in type expression analysis ${context}`);
    this.exp.analyze(context);
    this.type = this.exp.type;
  }
};
