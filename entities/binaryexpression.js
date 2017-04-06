const Expression = require('./expression');
const Type = require('./type');
const Context = require('../analyzer');

module.exports = class BinaryExpression {
  constructor(left, op, right) {
    // super();
    this.left = left;
    this.op = op;
    this.right = right;
  }
  toString() {
    return `${this.left}${this.op}${this.right}`;
  }

  analyze(context) {
    this.left.analyze(context);
    if (this.right.length > 0) {
      for (let i = 0; i < this.right.length; i += 1) {
        this.right[i].analyze(context);
        if (['*', '/', '+', '-'].includes(this.op[0].operator)) {
          console.log(this.left.type.literal);
          console.log(this.right[i].type.literal);
          if (!(Type.isNumber(this.left.type.literal)) || !(Type.isNumber(this.right[i].type.literal))) {
            throw Error('Invalid operands expected numbers');
          }
          this.type = Type.NUMBER;
        } else if (['and', 'or'].includes(this.op[0].operator)) {
          if (this.left.type.literal !== 'boolean' || this.right[i].type !== 'boolean') {
            throw Error('Expected Boolean values');
          }
          this.type = Type.BOOLEAN;
        } else if (['<', '<=', '>', '>=', '==', '!='].includes(this.op[0].operator)) {
          if (!(Type.isNumber(this.left.type.literal)) || !(Type.isNumber(this.right[i].type.literal))) {
            throw Error('Invalid operands expected numbers');
          }
          this.type = Type.BOOLEAN;
        }
      } // <--- will set this.left.type as a side effect
        // <---- will set this.right.type as a side effect
    }

    if (!this.type) {
      this.type = this.left.type;
    }
  }
};
