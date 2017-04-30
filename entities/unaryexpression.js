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

  optimize() {
    this.op = this.op.optimize();
    this.operand = this.operand.optimize();
    return this;
  }
};
