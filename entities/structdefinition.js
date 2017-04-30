module.exports = class StructDefinition {
  constructor(id, struct) {
    this.id = id;
    this.struct = struct;
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
