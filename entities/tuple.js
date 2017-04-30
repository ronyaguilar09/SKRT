const Type = require('./type');

module.exports = class Tuple {
  constructor(exp, lastExp) {
    this.exp = exp;
    this.lastExp = lastExp;
  }

  analyze(context) {
    this.exp.analyze(context);
    for (let i = 0; i < this.lastExp.length; i += 1) {
      this.lastExp[i].analyze(context);
    }
    this.type = Type.TUPLE;
  }

  optimize() {
    return this;
  }

};
