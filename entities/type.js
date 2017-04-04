const error = require('../error');
const cache = {};

module.exports = class Type {
  constructor(type) {
    this.type = type;
    cache[this.type] = this;
  }

  toString() {
    return `( ${this.type} )`;
  }

  analyze(context) {
    this.type.analyze(context);
  }

  mustBeInteger(message, location) {
    return this.mustBeCompatibleWith(Type.INT, message);
  }

  mustBeBoolean(message, location) {
    return this.mustBeCompatibleWith(Type.BOOL, message);
  }

  mustBeString(message, location) {
    return this.mustBeCompatibleWith(Type.STRING, message);
  }

  mustBeFloat(message, location) {
    return this.mustBeCompatibleWith(Type.FLOAT, message);
  }

  mustBeList(message, location) {
    return this.mustBeCompatibleWith(Type.LIST, message);
  }

  mustBeTuple(message, location) {
    return this.mustBeCompatibleWith(Type.TUPLE, message);
  }

  mustBeAny(message, location) {
    return this.mustBeCompatibleWith(Type.ANY, message);
  }

  mustBeCompatibleWith(otherType, message, location) {
    if (!this.isCompatibileWith(otherType)) {
      return error(message, location);
    }
    return true;
  }

  mustBeMutuallyCompatibileWith(otherType, message, location) {
    if (!(this.isCompatibileWith(otherType || otherType.isCompatibileWith(this)))) {
      return error(message, location);
    }
    return true;
  }

  isCompatibileWith(otherType) {
    return this === otherType;
  }
};

const Type = require('./type');

Type.INT = new Type('int');
Type.BOOL = new Type('bool');
Type.STRING = new Type('string');
Type.CHAR = new Type('char');
Type.FLOAT = new Type('float');
Type.LIST = new Type('list');
Type.TUPLE = new Type('tuple');
Type.ANY = new Type('any');
Type.ID = new Type('id');
