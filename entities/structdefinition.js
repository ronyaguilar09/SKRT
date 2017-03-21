class StructDefinition {
  constructor(_, id, _a, struct, _b) {
    this.id = id;
    this.struct = struct;
  }
  toString() {
    return (`( Id: ${this.id} = ( ${this.struct} ) )`);
  }
}
