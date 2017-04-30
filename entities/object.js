const Type = require('./type');

module.exports = class ObjectLiteral {
  constructor(id, exp, lastId, lastExp) {
    this.id = id;
    this.exp = exp;
    this.lastId = lastId;
    this.lastExp = lastExp;
  }
  toString() {
    return `Object: { ${this.lastId}} : ${this.lastExp}, ${this.id} : ${this.exp} }`;
  }

  analyze(context) {
    this.type = Type.OBJECT;
    context.variableMustNotBeAlreadyDeclared(this.lastId.name);
    context.addVariable(this.lastId, this.lastExp);
    this.lastId.analyze(context);
    this.lastExp.analyze(context);
    for (let i = 0; i < this.id.length; i += 1) {
      context.variableMustNotBeAlreadyDeclared(this.id[i].name);
      context.addVariable(this.id[i].name, this.exp[i]);
      this.id[i].analyze(context);
      this.exp[i].analyze(context);
    }
  }

  optimize() {
    this.id.forEach(id => id.optimize());
    this.exp.forEach(exp => exp.optimize());
    this.lastId = this.lastId.optimize();
    this.lastExp = this.lastExp.optimize();
    return this;
  }


};
