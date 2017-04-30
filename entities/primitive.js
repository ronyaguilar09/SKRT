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
    if (this.type.literal === 'id') {
      this.name = this.prim.name;
    }

    // this.value = this.prim.value;
  }

  optimize() {
    return this;
  }
};
