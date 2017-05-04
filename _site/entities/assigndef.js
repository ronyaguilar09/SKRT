module.exports = class AssignDef {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
  }

  analyze(context) {
    this.id.analyze();
    this.exp.analyze();
    this.context = context;
    const idType = context.lookupVariable(this.id.name).assertType;
    if (idType !== this.exp.type.literal && idType !== 'any') {
      throw Error('Numbers: Invalid operands expected numbers');
    }
  }

  optimize() {
    if (this.id.name === this.exp.name) {
      this.null = true;
    } else {
      this.null = false;
    }
    return this;
  }

};
