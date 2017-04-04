module.exports = class Primitive {
  constructor(prim) {
    this.value = prim;
  }
  toString() {
    return `( ${this.value} )`;
  }
};
