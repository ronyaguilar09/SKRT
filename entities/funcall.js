module.exports = class FunCall {
  constructor(id, args) {
    this.id = id;
    this.args = args;
  }
  toString() {
    return `Function ${this.id} with ${this.args}`;
  }
};
