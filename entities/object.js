module.exports = class Object {
  constructor(id, exp, lastId, lastExp) {
    this.id = id;
    this.exp = exp;
    this.lastId = lastId;
    this.lastExp = lastExp;
  }
  toString() {
    return `Object: { ${this.id}} : ${this.exp}, ${this.lastId} : ${this.lastExp} }`;
  }

  analyze(context){
    this.type = Type.OBJECT;
    this.id.analyze(context);
  }
};
