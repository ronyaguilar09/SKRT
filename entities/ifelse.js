module.exports = class IfElse {
  constructor(cond1, body1, cond2, body2, body3) {
    this.cond1 = cond1;
    this.body1 = body1;
    this.cond2 = cond2;
    this.body2 = body2;
    this.body3 = body3;
  }

  analyze(context) {
    this.cond1.analyze(context);
    this.body1.analyze(context.createChildContextForBlock());
    this.cond2.forEach(c => c.analyze(context));
    this.body2.forEach(b => b.analyze(context.createChildContextForBlock()));
    this.body3.forEach(b => b.analyze(context.createChildContextForBlock()));
  }

  optimize() {
    this.cond1 = this.cond1.optimize();
    this.body1.forEach(b1 => b1.optimize());
    this.cond2 = this.cond2.optimize();
    this.body2.forEach(b2 => b2.optimize());
    this.body3.forEach(b3 => b3.optimize());
    return this;
  }

};
