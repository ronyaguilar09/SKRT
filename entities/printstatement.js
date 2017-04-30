module.exports = class PrintStatement {
  constructor(exp) {
    this.exp = exp;
  }
  toString() {
    return `print(${this.exp})`;
  }
  analyze(context) {
    this.exp.analyze(context);
  }

  optimize() {
    this.exp = this.exp.optimize();
    return this;
  }
};
