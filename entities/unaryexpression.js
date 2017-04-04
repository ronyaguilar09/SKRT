module.exports = class UnaryExpression extends Expression {
  constructor(op, operand) {
    super();
    this.op = op;
    this.operand = operand;
  }
  toString() {
    return `( ${this.op.join()}${this.operand.join()} )`;
  }
};
