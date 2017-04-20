class IfElse {
  constructor(_, _a, cond1, _b, body1, _c, _d, _e, cond2, _f, _g, body2, _h, _i, _j, body3, _k) {
    this.cond1 = cond1;
    this.body1 = body1;
    this.cond2 = cond2;
    this.body2 = body2;
    this.body3 = body3;
  }
  toString() {
    return (`If: ${this.cond1} Body: ${this.body1
    } IfElse: ${this.cond2.join(' ')} Body2: ${this.body2.join(' ')
              } Else: ${this.body3} )`);
  }
}
