module.exports = class Primitive {
  constructor(prim) {
    this.prim = prim;
  }
  toString() {
    return `( ${this.prim} )`;
  }
  analyze(context) {
    this.prim.analyze(context);
    this.type = this.prim.type;
  }
};
