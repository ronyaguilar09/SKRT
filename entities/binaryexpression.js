const Expression = require('./expression');
const Type = require('./type');
const Context = require('../analyzer');

module.exports = class BinaryExpression {
  constructor(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
  }

  analyze(context) {
    this.left.analyze(context);
    if (this.left.name) {
      this.left.type = context.lookupVariable(this.left.name).type;
    }

    if (this.right) {
      this.right.analyze(context);
      if (this.right.name) {
        this.right.type = context.lookupVariable(this.right.name).type;
      }

      if (['*', '/', '+', '-'].includes(this.op.operator)) {
        if (!(Type.isNumber(this.left.type.literal)) || !(Type.isNumber(this.right.type.literal))) {
          throw Error('Numbers: Invalid operands expected numbers');
        }
        this.type = Type.NUMBER;
      } else if (['and', 'or'].includes(this.op.operator)) {
        if (this.left.type.literal !== 'bool' || this.right.type.literal !== 'bool') {
          throw Error('Expected Boolean values');
        }
        this.type = Type.BOOLEAN;
      } else if (['<', '<=', '>', '>='].includes(this.op.operator)) {
        if (!(Type.isNumber(this.left.type.literal)) || !(Type.isNumber(this.right.type.literal))) {
          throw Error('Invalid boolean expected numbers');
        }
        this.type = Type.BOOLEAN;
      }
    }

    if (!this.type) {
      this.type = this.left.type;
    }
  }

  optimize() {
    this.left = this.left.optimize();
    this.right = this.right.optimize();

    return this;
  }
};
