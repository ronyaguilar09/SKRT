module.exports = class StructDefinition {
  constructor(id, struct) {
    this.id = id;
    this.struct = struct;
  }
  toString() {
    return `( Id: ${this.id} = ( ${this.struct} ) )`;
  }
  analyze(context) {
    context.variableMustNotBeAlreadyDeclared(this.id); // Not Sure
  }

  optimize() {
    this.id = this.id.optimize();
    this.struct = this.struct.optimize();
    return this;
  }
};
