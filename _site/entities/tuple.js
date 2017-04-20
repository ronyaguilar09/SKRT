class Tuple {
  constructor(openP, exp, comma, lastExp, closeP) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return (`Tuple: (${this.exp}, ${this.lastExp})`);
  }
}
