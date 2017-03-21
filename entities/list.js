class List {
  constructor(openB, exp, comma, lastExp, closeB) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return (`List: [${this.exp}, ${this.lastExp}]`);
  }
}
