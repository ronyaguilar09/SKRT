const Type = require('./type');

module.exports = class Op {
  constructor(op) {
    this.operator = op;
  }

  toString() {
    return ` (Op: ${this.operator}) `;
  }

  getOp() {
    return `${this.operator}`;
  }

  analyze(context) {
      console.log('in op analysis')
      switch (this.op) {
        case '+':
        case '-': this.type = Type.ADDOP; break;
        case '*':
        case '/':
        case '%': this.type = Type.MULOP; break;
        case 'and':
        case 'or': this.type = Type.LOGOP; break;
        case '>':
        case '>=':
        case '<':
        case '<=':
        case '==':
        case '!=': this.type = Type.RELOP; break;
        case '**': this.type = Type.EXOP; break;
        case '.': this.type = Type.DOTOP; break;
        default:
      }
  }
};
