const Type = require('./type');

module.exports = class FunctionDefinition {
  constructor(funName, params, body) {
    this.id = funName;
    this.params = params;
    this.body = body;
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

  optimize() {
    this.id = this.id.optimize();
    this.params.forEach(p => p.optimize());
    this.body.forEach(s => s.optimize());
    this.body = this.body.filter(s => s !== null);
  // Suggested: Look for returns in the middle of the body
    return this;
  }
  };
