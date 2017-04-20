module.exports = class Match {
  constructor(exp, mblock) {
    this.exp = exp;
    this.block = mblock;
  }
  toString() {
    return `( Match: ${this.exp} Block: ${this.block} )`;
  }
  analyze(context) {
    this.exp.analyze(context);
    this.block.analyze(context);
  }
};
