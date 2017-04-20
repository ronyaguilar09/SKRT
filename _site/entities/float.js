class Float {
  constructor(value, value2) {
    this.value1 = value;
    this.value2 = value2;
  }
  toString() {
    return (`Float: ${this.value1.join('')}. ${this.value2.join('')}`);
  }
}
