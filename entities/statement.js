module.exports = class Statement {
  constructor(stmt) {
    this.statement = stmt;
  }
  toString() {
    return `( Statement: ${this.statement} )`;
  }
  analyze(context) {
    console.log(`in statement analysis: ${context}`);
    return this.statement.analyze(context);
  }
};
