class ObjectDefinition {
  constructor(_, id, _a, obj) {
    this.id = id;
    this.obj = obj;
  }
  toString() {
    return (`( Obj: ${this.id} = ${this.obj} )`);
  }
}
