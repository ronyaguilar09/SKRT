class MatchPattern {
  constructor(exp) {
    this.exp = exp;
  }
  toString() {
    return (`( Pattern: ${this.exp} )`);
  }
}
