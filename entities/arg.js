module.exports = class Arg {
  constructor(arg) {
    this.arg = arg;
  }
  toString() {
    return `${this.arg} `;
  }
  analyze(context) {
    this.arg.analyze(context);
  }
  optimize() {
    this.expression = this.expression.optimize();
    return this;
  }
};
