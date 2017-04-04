module.exports = class Arg {
  constructor(arg) {
    this.arg = arg;
  }
  toString() {
    return `${this.arg}`;
  }
};
