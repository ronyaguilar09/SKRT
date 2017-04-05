module.exports = class Definition {
  constructor(def) {
    this.definition = def;
  }
  toString() {
    return `(Definition: ${this.definition} )`;
  }

  analyze(context) {
    console.log(`in definiton analysis: ${context}`);
    this.definition.analyze(context);
  }
};
