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
    if (this.left.name) {
      this.type = context.lookupVariable(this.left.name).type;
    }
    if (this.right.length > 0) {
      for (let i = 0; i < this.right.length; i += 1) {
        this.right[i].analyze(context);
        if (['*', '/', '+', '-'].includes(this.op[0].operator)) {
          if (!(Type.isNumber(this.left.type.literal)) || !(Type.isNumber(this.right[i].type.literal))) {
            throw Error('Numbers: Invalid operands expected numbers');
          }
          this.type = Type.NUMBER;
          // this.value = `${this.left.value} ${this.op[0]} ${this.right.value}`;
        } else if (['and', 'or'].includes(this.op[0].operator)) {
          if (this.left.type.literal !== 'bool' || this.right[i].type.literal !== 'bool') {
            throw Error('Expected Boolean values');
          }
          this.type = Type.BOOLEAN;
          // this.value = `${this.left.value} ${this.op[0]} ${this.right.value}`;
        } else if (['<', '<=', '>', '>=', '==', '!='].includes(this.op[0].operator)) {
          if (!(Type.isNumber(this.left.type.literal)) || !(Type.isNumber(this.right[i].type.literal))) {
            throw Error('Invalid boolean expected numbers');
          }
          this.type = Type.BOOLEAN;
          // this.value = `${this.left.value} ${this.op[0]} ${this.right.value}`;
        }
      }
    }

    if (!this.type) {
      this.type = this.left.type;
    }

    if (!this.value) {
      // this.value = this.left.value;
    }
  }

  optimize() {
    this.left = this.left.optimize();
    this.right = this.right.optimize();
    return this;
  }
};
