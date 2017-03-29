class Program {
  constructor(body) {
    this.body = body;
  }
  toString() {
    return (`( Program: ${this.body} )`);
  }
  analyze() {
      return this.body.analyze(initialContext());
  }
}
