module.exports = class Match {

  constructor(exp, mblock) {
    this.exp = exp;
    this.block = mblock;
  }

  analyze(context) {
    this.exp.analyze(context);
    this.block.analyze(context);
  }

  optimize() {
    this.exp = this.exp.optimize();
    this.block.forEach(b => b.optimize());
    return this;
  }
};
