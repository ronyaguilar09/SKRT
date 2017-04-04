class MatchBlock {
  constructor(pattern, stmt) {
    this.pattern = pattern;
    this.stmt = stmt;
  }
  toString() {
    return (`( MatchPattern: ${this.pattern} Statement: ${this.stmt} )`);
  }
}
