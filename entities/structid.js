module.exports = class StructId {
  constructor(id) {
    this.id = id;
  }
  toString() {
    return `( ${this.id} )`;
  }
};
