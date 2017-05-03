const BreakException = {};
module.exports = class IfElse {
  constructor(cond1, body1, cond2, body2, body3) {
    this.cond1 = cond1;
    this.body1 = body1;
    this.cond2 = cond2;
    this.body2 = body2;
    this.body3 = body3;
  }

  analyze(context) {
    this.context = context;
    this.cond1.analyze(context);
    this.body1.analyze(context.createChildContextForBlock());
    this.cond2.forEach(c => c.analyze(context));
    this.body2.forEach(b => b.analyze(context.createChildContextForBlock()));
    this.body3.forEach(b => b.analyze(context.createChildContextForBlock()));
  }

  optimize() {
    this.cond1 = this.cond1.optimize();
    let left;
    let right;
    if (this.cond1.left.exp.name) {
      left = this.context.lookupVariable(this.cond1.left.exp.name);
      left = left.exp.literal.prim.value;
    } else {
      left = this.cond1.left.exp.literal.prim.value;
    }

    if (this.cond1.right.exp.name) {
      right = this.context.lookupVariable(this.cond1.right.exp.name);
      right = right.exp.literal.prim.value;
    } else {
      right = this.cond1.right.exp.literal.prim.value;
    }

    switch (this.cond1.op.operator) {
      case '<' : if (left < right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      case '<=' : if (left <= right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      case '>' : if (left > right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      case '>=' : if (left >= right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      case '==' : if (left === right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      case '!=' : if (left !== right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      case 'and' : if (left && right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      case 'or' : if (left || right) {
        this.body1 = this.body1.optimize(); this.body2 = []; this.cond2 = []; this.body3 = [];
      } break;
      default:
    }
    let match = false;
    try {
      this.cond2.forEach((c, i) => {
        c.optimize();

        let leftV;
        let rightV;
        if (c.left.exp.name) {
          leftV = this.context.lookupVariable(c.left.exp.name);
          leftV = leftV.exp.literal.prim.value;
        } else {
          leftV = c.left.exp.literal.prim.value;
        }

        if (c.right.exp.name) {
          rightV = this.context.lookupVariable(c.right.exp.name);
          rightV = rightV.exp.literal.prim.value;
        } else {
          rightV = c.right.exp.literal.prim.value;
        }

        console.log(i);
        console.log(this.body2[i]);
        switch (c.op.operator) {
          case '<' : if (leftV < rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];
            match = true;
          } break;
          case '<=' : if (leftV <= rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];

            match = true;
          } break;
          case '>' : if (leftV > rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];

            match = true;
          } break;
          case '>=' : if (leftV >= rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];

            match = true;
          } break;
          case '==' : if (leftV === rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];

            match = true;
          } break;
          case '!=' : if (leftV !== rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];

            match = true;
          } break;
          case 'and' : if (leftV && rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];

            match = true;
          } break;
          case 'or' : if (leftV || rightV) {
            this.body2[i] = this.body2[i].optimize();
            const temp = [];
            const tempc = [];
            for (let j = 0; j <= i; j += 1) {
              temp.push(this.body2[j]);
              tempc.push(this.cond2[j]);
            }
            this.body2 = temp;
            this.cond2 = tempc;
            this.body3 = [];

            match = true;
          } break;

          default:
        }

        if (match) {
          throw BreakException;
        }
      });
    } catch (e) {

    }

    this.body3.forEach(b3 => b3.optimize());
    return this;
  }

};
