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
      this.left.analyze(context);     // <--- will set this.left.type as a side effect
      console.log(`left: ${this.left.type}`);
      this.right.forEach(exp => exp.analyze(context));    // <---- will set this.right.type as a side effect
      console.log(`right: ${this.right.type}`);
      this.op.forEach( o => {
          if (["*", "/", "+", "-"].includes(o.operator)) {
              if ( !(Type.isNumber(this.left.type)) || !(Type.isNumber(this.right.type))) {
                  throw Error(`Invalid operands, expected numbers`);
              }
              this.type = Type.NUMBER;
          } else if (["and", "or"].includes(o.operator)) {
              if(this.left.type !== Type.BOOLEAN || this.right.type !== Type.BOOLEAN) {
                  throw Error(`Expected Boolean values`)
              }
              this.type = Type.BOOLEAN;
          } else if (["<", "<=", ">", ">=", "==", "!="].includes(o.operator)) {
              if (!(Type.isNumber(this.left.type)) || !(Type.isNumber(this.right.type))) {
                  throw Error(`Invalid operands, expected numbers`);
              }
              this.type = Type.BOOLEAN;
          }
      });

      if(!this.type) {
          this.type = this.left.type;
      }

      //console.log(this.type);
    }
};
