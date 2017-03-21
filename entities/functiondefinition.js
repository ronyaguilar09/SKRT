class FunctionDefinition {
  constructor(_, funName, params, _a, _b, body, _c) {
    this.id = funName;
    this.params = params;
    this.body = body;
  }
  toString() {
    return (`( Func: ${this.id} (${this.params.join(' ')})= ${this.body} )`);
  }
}
