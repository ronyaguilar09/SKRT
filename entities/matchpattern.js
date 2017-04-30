module.exports = class MatchPattern {
  constructor(exp) {
    this.exp = exp;
  }

  analyze(context) {
    this.exp.analyze(context);
  }

  optimize() {

  }
};
