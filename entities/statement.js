module.exports = class Statement {

  constructor(stmt) {
    this.statement = stmt;
  }

  analyze(context) {
    return this.statement.analyze(context);
  }

  optimize() {
    this.statement = this.statement.optimize();
    return this;
  }
};
