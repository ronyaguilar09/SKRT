const BooleanLiteral = require('./boolean');
const NumericLiteral = require('./integer');

module.exports = class UnaryExpression {
  constructor(op, operand) {
    this.op = op;
    this.operand = operand;
  }

  analyze(context) {
    this.op.analyze(context);
    this.operand.analyze(context);
  }
  optimize() {
    this.operand = this.operand.optimize();
    if (this.op === 'not' && this.operand instanceof BooleanLiteral) {
      return BooleanLiteral(!this.operand.value);
    } else if (this.op === '-' && this.operand instanceof NumericLiteral) {
      return new NumericLiteral(-this.operand.value);
    }
    return this;
  }
};
