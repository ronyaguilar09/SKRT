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

  setVariable(name, value) {
    this.variables[name] = value;
  }

  lookupVariable(name) {
    if (name in this.variables) {
      return this.variables[name];
    } else if (this.parent === null) {
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
}

AnalysisContext.INITIAL = new AnalysisContext();

module.exports = AnalysisContext;
