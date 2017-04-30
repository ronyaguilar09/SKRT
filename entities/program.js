const Context = require('../analyzer');

module.exports = class Program {

  constructor(body) {
    this.body = body;
  }

  toString() {
    return `( Program: ${this.body})`;
  }

  analyze(context = Context.INITIAL) {
    return this.body.analyze(context);
  }

  optimize() {
    this.body = this.body.optimize();
    return this;
  }
};
