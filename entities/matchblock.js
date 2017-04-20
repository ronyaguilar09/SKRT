module.exports = class MatchBlock {
  constructor(pattern, stmt) {
    this.pattern = pattern;
    this.stmt = stmt;
  }
  toString() {
    return `( MatchPattern: ${this.pattern} Statement: ${this.stmt} )`;
  }
  analyze(context) {
    for (let i = 0; i < this.pattern.length; i += 1) {
      this.pattern[i].analyze(context);
      this.stmt[i].analyze(context);
    }
  }
};
