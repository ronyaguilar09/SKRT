class Body {
  constructor(stmts) {
    this.statements = stmts;
  }
  toString() {
    return (`( Body: ${this.statements.join(' ')} )`);
  }
  analyze(context) {
    const localContext = context.createChildContext();
    const result = []; // Not sure
    for (let i = 0; i < this.statements.len(); i += 1) {
      result.push(this.statements[i].analyze(localContext));
    }
    return result;
  }
}
