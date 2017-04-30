const Type = require('./type');

module.exports = class Tuple {
  constructor(exp, lastExp) {
    this.exp = exp;
    this.lastExp = lastExp;
  }

  analyze(context) {
    this.lastExp.analyze(context);
    for (let i = 0; i < this.exp.length; i += 1) {
      this.exp[i].analyze(context);
    }
    this.type = Type.TUPLE;
  }

  optimize() {
    return this;
  }

};
