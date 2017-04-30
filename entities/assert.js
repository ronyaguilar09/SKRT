module.exports = class Assert {
  constructor(type) {
    this.type = type;
  }
  toString() {
    return `Assert Type: ${this.type}`;
  }
  analyze(context) {
  }
};
