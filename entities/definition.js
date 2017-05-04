module.exports = class Definition {

  constructor(def) {
    this.typeOfDef = def;
  }

  analyze(context) {
    this.typeOfDef.analyze(context);
  }

  optimize() {
    this.typeOfDef = this.typeOfDef.optimize();
    this.null = this.typeOfDef.null;
    return this;
  }
};
