module.exports = class Body {
  constructor(stmts) {
    this.statements = stmts;
  }
  toString() {
    return `( Body: ${this.statements.join(' ')} )`;
  }
  analyze(context) {
    console.log(`in body analysis: ${context}`);
    this.statements.forEach(s => s.analyze(context));
  }
};
