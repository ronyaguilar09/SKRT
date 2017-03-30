class Statement {
  constructor(stmt) {
    this.statement = stmt;
  }
  toString() {
    return (`( Statement: ${this.statement} )`);
  }
  analyze(context) {
    return this.statement.analyze(context);
  }
}
