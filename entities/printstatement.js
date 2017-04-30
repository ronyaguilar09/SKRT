module.exports = class PrintStatement {
  constructor(exp) {
    this.exp = exp;
  }

  analyze(context) {
    this.exp.analyze(context);
  }

  optimize() {
    this.exp = this.exp.optimize();
    return this;
  }
};
