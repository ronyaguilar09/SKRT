class ObjectDefinition {
  constructor(_, id, _a, obj) {
    this.id = id;
    this.obj = obj;
  }
  toString() {
    return (`( Obj: ${this.id} = ${this.obj} )`);
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id);
    context.addVariable(this.id, this.obj);
    return this.obj.analyze(this.obj);
  }
}
