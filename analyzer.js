const error = require('./error');
const VariableDefinition = require('./entities/variabledefinition');
const FunctionDefinition = require('./entities/functiondefinition');

// TODO: create an arg and args entity
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
    if (this.symbolTable[name]) {
      return error(`Variable ${name} already declared`, name);
    }
  }

  addVariable(entity) {
    if (entity.id in this.variables) {
      throw new Error(`Identifier ${entity.id} already declared in this scope`);
    }
    this.variables[entity.id] = entity;
  }

  lookupVariable(name) {
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
}

// Context.INITIAL = new Context();

// module.exports = Context;
