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
    this.type = this.exp.type;
    if (this.exp.name) {
      this.name = this.exp.name;
    }

    this.value = this.exp.value;
  }
};
