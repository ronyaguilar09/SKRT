class For {
  constructor(_, id, from, exp1, to, exp2, b1, body, b2) {
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.body = body;
  }
  toString() {
    return (`( For: ${this.id} from ${this.exp1} to ${this.exp2} ${this.body})`);
  }
}
