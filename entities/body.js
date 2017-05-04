module.exports = class Body {

  constructor(stmts) {
    this.statements = stmts;
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }

  optimize() {
    const temp = [];
    this.statements.forEach((s, i) => {
      s.optimize();
      if (!s.null) {
        temp.push(s);
      }
    });
    this.statements = temp;
    return this;
  }

};
