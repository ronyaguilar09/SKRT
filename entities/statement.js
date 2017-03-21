class Statement {
  constructor(stmt) {
    this.statement = stmt;
  }
  toString() {
    return (`( Statement: ${this.statement} )`);
  }
}
