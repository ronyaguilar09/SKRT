module.exports = class ObjectDefinition {
  constructor(id, obj) {
    this.id = id;
    this.obj = obj;
  }

  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this.obj);
    const localcontext = context.createChildContextForFunctionBody(this);

    this.id.analyze(context);
    this.obj.analyze(localcontext);
  }

  optimize() {
    this.id = this.id.optimize();
    this.obj = this.obj.optimize();
    return this;
  }
};
