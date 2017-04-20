module.exports = class MatchPattern {
  constructor(exp) {
    this.exp = exp;
  }
  toString() {
    return `( Pattern: ${this.exp} )`;
  }

  analyze(context) {
    this.exp.analyze(context);
  }
};
