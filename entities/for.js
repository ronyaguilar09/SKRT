const Type = require('./type');
const Context = require('../analyzer');

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
};
