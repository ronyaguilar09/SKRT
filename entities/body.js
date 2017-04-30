module.exports = class Body {

  constructor(stmts) {
    this.statements = stmts;
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }

  optimize() {
    this.stmts.forEach(s => s.optimize());
    return this;
  }

};
