const Type = require('./type');
const Context = require('../analyzer');

module.exports = class For {
  constructor(id, exp1, exp2, body) {
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.body = body;
  }

  analyze(context) {
    this.localContext = context.createChildContextForLoop();
    this.id.analyze(this.localContext);
    this.exp1.analyze(this.localContext);
    this.exp2.analyze(this.localContext);
    if (!Type.isNumber(this.exp1.type.literal) || !Type.isNumber(this.exp2.type.literal)) {
      throw Error('Expected numeric values in range for loop');
    }
    this.localContext.addVariable(this.id, this.exp1);
    this.body.analyze(this.localContext);
  }

  optimize() {
    this.id = this.id.optimize();
    this.exp1 = this.exp1.optimize();
    this.exp2 = this.exp2.optimize();
    this.body = this.body.optimize();
    return this;
  }
};
