class Else {
  constructor(_, _a, exp1, _b, _c, body1, _d, _e, _f, body2, _g) {
    this.exp1 = exp1;
    this.body1 = body1;
    this.body2 = body2;
  }
  toString() {
    return (`( If: ${this.exp1} Body: ${this.body1
              } Else: ${this.body2} )`);
  }
}
