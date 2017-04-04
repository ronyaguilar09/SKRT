module.exports = class String {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `String: ${this.value.join('')}`;
  }
 };
