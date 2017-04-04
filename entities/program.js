const Context = require('../analyzer');

class Program {
  constructor(body) {
    this.body = body;
  }
  toString() {
    return (`( Program: ${this.body} )`);
  }
  analyze(context = Context.INITIAL) {
    return this.body.analyze(context);
  }
}
