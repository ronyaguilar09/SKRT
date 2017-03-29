class Body {
  constructor(stmts) {
    this.statements = stmts;
  }
  toString() {
    return (`( Body: ${this.statements.join(' ')} )`);
  }
  analyze(context){
      let localContext = context.createChildContext();
      return (statements.map(() => {
          this.analyze(localContext);
      }));
  }
}
