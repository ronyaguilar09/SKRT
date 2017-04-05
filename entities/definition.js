module.exports = class Definition {
  constructor(def) {
    this.typeOfDef = def;
  }
  toString() {
    return `(Definition: ${this.typeOfDef} )`;
  }

  analyze(context) {
    console.log(`in definiton analysis: ${context}`);
    this.typeOfDef.analyze(context);
  }
};
