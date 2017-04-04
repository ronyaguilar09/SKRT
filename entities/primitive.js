module.exports = class Primitive {
  constructor(prim) {
    this.type = prim;
  }
  toString() {
    return `( ${this.type} )`;
  }
  analyze(context) {
    this.type.analyze(context);
  }
};
