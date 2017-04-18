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
    this.id.analyze(context);
    context.variableMustNotBeAlreadyDeclared(this.id.name, 'Function already declared');
    this.localContext = context.createChildContextForFunctionBody(this);
    for (let i = 0; i < this.params.length; i += 1) {
      this.localContext.variableMustNotBeAlreadyDeclared(this.params[i], 'Duplicate Parameters found in definition');
      this.params[i].analyze(this.localContext);
      this.localContext.addVariable(this.params[i], Type.ANY);
    }
    context.addVariable(this.id, this);
    if (this.body) {
      this.body.analyze(this.localContext);
    }
  }
};
