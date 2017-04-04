module.exports = class TypeExpression {
  constructor(exp) {
    // super();
    this.exp = exp;
  }
  toString() {
    return `TypeofExpression: ${this.exp}`;
  }
};
