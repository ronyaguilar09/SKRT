class AnalysisContext {
    constructor(parent){
        this.parent = parent;
        this.symbolTable = {};
    }

    initialContext() {
        return new AnalysisContext(null);
    }

    createChildContext() {
        return new AnalysisContext(this);
    }

    variableMustNotBeAlreadyDeclared(name) {
        if(this.symbolTable[name]){
            return error(`Variable ${name} already declared`, name);
        }
    }

    addVariable(name, value) {
        return this.symbolTable[name] = value;
    }

    lookupVariable(name) {
        let variable = this.symbolTable[name];
        if(variable) {
            return variable;
        } else if (!this.parent) {
            error(`Variable ${name} not found`, name);
            return VariableDefinition.NULL;
        } else {
            return this.parent.lookupVariable(name);
        }
    }

}
