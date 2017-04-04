module.exports = class FunCall {
  constructor(id, args) {
    this.id = id;
    this.args = args;
  }
  toString() {
    return `Function Call ${this.id} with ${this.args}`;
  }
};
