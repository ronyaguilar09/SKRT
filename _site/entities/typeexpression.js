module.exports = class TypeExpression {
  constructor(exp) {
    // super();
    this.exp = exp;
  }

  analyze(context) {
    this.exp.analyze(context);
    this.type = this.exp.type;
    if (this.exp.name) {
      this.name = this.exp.name;
    }

    // this.value = this.exp.value;
  }
  optimize() {
    this.exp = this.exp.optimize();
    return this;
  }
};
