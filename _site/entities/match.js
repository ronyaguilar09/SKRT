class Match {
  constructor(_, _a, exp, _b, _c, mblock) {
    this.exp = exp;
    this.block = mblock;
  }
  toString() {
    return (`( Match: ${this.exp} Block: ${this.block.join(' ')} )`);
  }
}
