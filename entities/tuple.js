class Tuple {
  constructor(exp, lastExp) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return (`Tuple: (${this.exp}, ${this.lastExp})`);
  }
}
