const Context = require('../analyzer');

module.exports = class Program {
  constructor(body) {
    this.body = body;
  }
  toString() {
    return `( Program: ${this.body} )`;
  }
  analyze(context = Context.INITIAL) {
    console.log(`in program analysis: ${context}`);
    return this.body.analyze(context);
  }
};
