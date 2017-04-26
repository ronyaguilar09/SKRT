module.exports = class Body {
  constructor(stmts) {
    this.statements = stmts;
  }
  toString() {
    return `( Body: ${this.statements.join('\n')} )`;
  }
  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }
};
