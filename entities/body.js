class Body {
  constructor(stmts) {
    this.statements = stmts;
  }
  toString() {
    return (`( Body: ${this.statements.join(' ')} )`);
  }
}
