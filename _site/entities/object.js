class Object {
  constructor(openB, id, colon, exp, comma, lastId, lastColon, lastExp, lastCloseB) {
    this.id = id;
    this.exp = exp;
    this.lastId = lastId;
    this.lastExp = lastExp;
  }
  toString() {
    return (`Object: { ${this.id}} : ${this.exp}, ${this.lastId} : ${this.lastExp} }`);
  }
}
