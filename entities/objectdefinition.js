module.exports = class ObjectDefinition {
  constructor(id, obj) {
    this.id = id;
    this.obj = obj;
  }
  toString() {
    return `(Obj: ${this.id} = ${this.obj} )`;
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this.obj);
    const localcontext = context.createChildContextForFunctionBody(this);

    this.id.analyze(context);
    this.obj.analyze(localcontext);
  }
};
