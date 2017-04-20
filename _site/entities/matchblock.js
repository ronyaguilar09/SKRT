class MatchBlock {
  constructor(_, pattern, _a, stmt) {
    this.pattern = pattern;
    this.stmt = stmt;
  }
  toString() {
    return (`( MatchPattern: ${this.pattern} Statement: ${this.stmt} )`);
  }
}
