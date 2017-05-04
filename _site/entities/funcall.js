module.exports = class FunCall {
  constructor(id, args) {
    this.id = id;
    this.args = args;
  }

  analyze(context) {
    this.id.analyze(context);
    this.exp = context.lookupVariable(this.id.name);

    for (let i = 0; i < this.args.length; i += 1) {
      this.args[i].analyze(context);
      let value;
      if (this.args[i].arg.type.literal === 'id') {
        value = context.lookupVariable(this.args[i].arg.name);
      } else {
        value = this.args[i].arg;
      }

      this.exp.localContext.setVariable(this.exp.params[i].name, value);
    }
  }
  optimize() {
    this.id = this.id.optimize();
    this.args.forEach(a => a.optimize());
    return this;
  }
};
