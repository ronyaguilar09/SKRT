module.exports = class Op {
  constructor(op) {
    this.op = op;
  }

  toString() {
    return ` (Op: ${this.op}) `;
  }
};
