class IfElse {
  constructor(cond1, body1, cond2, body2, body3) {
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

  analyze(context) {
    const booleanCondition = 'Condition in if statement must be boolean';
    this.cond1.type.mustBeBoolean(booleanCondition);
    this.body1.analyze(context.createChildContextForBlock());
    this.cond2.forEach(c => c.analyze());
  }
}
