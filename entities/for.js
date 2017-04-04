module.exports = class For {
  constructor(id, exp1, exp2, body) {
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.body = body;
  }
  toString() {
    return `( For: ${this.id} from ${this.exp1} to ${this.exp2} ${this.body})`;
  }
};
