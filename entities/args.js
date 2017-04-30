module.exports = class Args {
  constructor(arg) {
    this.arg = arg;
  }

  toString() {
    return `Args: ${this.arg}`;
  }
};
