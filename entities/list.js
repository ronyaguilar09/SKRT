class List {
  constructor(exp, lastExp) {
    this.exp = exp;
    this.lastExp = lastExp;
  }
  toString() {
    return (`List: [${this.exp}, ${this.lastExp}]`);
  }
}
