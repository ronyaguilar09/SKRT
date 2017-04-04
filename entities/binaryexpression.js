class BinaryExpression extends Expression {
  constructor(left, op, right) {
    super();
    this.left = left;
    this.op = op;
    this.right = right;
  }
  toString() {
    return (`( ${this.left}${this.op}${this.right} )`);
  }

  analyze(context) {
    this.left.analyze(context);
    this.right.analyze(context);
  }
}
