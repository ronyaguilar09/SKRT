const Type = require('./type');

module.exports = class FunctionDefinition {
  constructor(funName, params, body) {
    this.id = funName;
    this.params = params;
    this.body = body;
  }
  toString() {
    return `( Func: ${this.id} (${this.params.join(' ')})= ${this.body} )`;
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id, 'Function already declared');
    const localContext = context.createChildContext();

    for (let i = 0; i < this.params.length; i += 1) {
      localContext.variableMustNotBeAlreadyDeclared(this.params[i], 'Duplicate Parameters found in definition');
      localContext.addVariable(this.params[i], Type.ANY);
    }

    this.body.analyze(localContext);
  }
};