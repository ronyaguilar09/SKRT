module.exports = class Definition {

  constructor(def) {
    this.typeOfDef = def;
  }

  analyze(context) {
    this.typeOfDef.analyze(context);
  }

  optimize() {
    this.typeOfDef = this.typeOfDef.optimize();
    return this;
  }
};
