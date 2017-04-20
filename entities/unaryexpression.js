module.exports = class UnaryExpression {
  constructor(op, operand) {
    this.op = op;
    this.operand = operand;
  }
  toString() {
    return `( ${this.op.join()}${this.operand.join()} )`;
  }
  analyze(context) {
    this.op.analyze(context);
    this.operand.analyze(context);
  }
};
