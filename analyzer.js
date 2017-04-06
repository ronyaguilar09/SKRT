const error = require('./error');
const VariableDefinition = require('./entities/variabledefinition');
const FunctionDefinition = require('./entities/functiondefinition');
const Type = require('./entities/type');
const Arg = require('./entities/arg');

class AnalysisContext {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    this.parent = parent;
    this.variables = Object.create(null);
    this.currentFunction = currentFunction;
    this.inLoop = inLoop;
  }

  createChildContextForFunctionBody(currentFunction) {
    return new AnalysisContext({ parent: this, currentFunction: this.currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    return new AnalysisContext({ parent: this, currentFunction: this.currentFunction, inLoop: true });
  }

  createChildContextForBlock() {
    return new AnalysisContext({ parent: this, currentFunction: this.currentFunction, inLoop: this.inLoop });
  }

  variableMustNotBeAlreadyDeclared(name) {
    if (this.variables[name]) {
      throw new Error(`Variable ${name} already declared`, name);
    }
  }

  addVariable(id, value) {
    if (id.name in this.variables) {
      throw new Error(`Identifier ${id.name} already declared in this scope`);
    }
    this.variables[id.name] = value;
  }

  lookupVariable(name) {
    console.log('in lookup variable');
    if (name in this.variables) {
      return this.variables[name];
    } else if (!this.parent === null) {
      throw new Error(`Identifier ${name} has not been declared`);
    } else {
      return this.parent.lookupVariable(name);
    }
  }

  assertInFunction(message) {
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }

  assertIsFunction(entity) {
    if (entity.constructor !== FunctionDefinition) {
      throw new Error(`${entity.id} is not a function`);
    }
  }

  static assertCanEvaluate(left, right, operator) {
    switch (operator.type) {
      case Type.ADDOP :
      case Type.MULOP :
      case Type.EXOP :
      case Type.RELOP :
        if (left.type !== Type.INT || left.type !== Type.FLOAT) {
          throw new Error('Left operand is invalid');
        } else if (right.type !== Type.INT || right.type !== Type.FLOAT) {
          throw new Error('Right operand is invalid');
        } break;
      case Type.LOGOP :
        if (left.type !== Type.BOOL) {
          throw new Error('Left operand is invalid');
        } else if (right.type !== Type.BOOL) {
          throw new Error('Right operand is invalid');
        } break;
      case Type.PREOP :
      case Type.DOTOP :
      default:
    }
  }

}

AnalysisContext.INITIAL = new AnalysisContext();

module.exports = AnalysisContext;
