module.exports = class ObjectDefinition {
  constructor(id, obj) {
    this.id = id;
    this.obj = obj;
  }
  toString() {
    return `( Obj: ${this.id} = ${this.obj} )`;
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this.obj);
    this.obj.analyze(context);
    this.id.analyze(context);
  }
};
