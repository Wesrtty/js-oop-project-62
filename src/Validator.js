import * as schemas from './schemas/index.js';

class Validator {
  constructor() {
    this.schemas = {
      String: schemas.StringSchema,
      Number: schemas.NumberSchema,
      Array: schemas.ArraySchema,
      Object: schemas.ObjectSchema,
    };
  }

  hasSchemas(name) {
    return Boolean(this.schemas[name]);
  }

  addValidator(type, name, fn) {
    const schema = type.charAt(0).toUpperCase() + type.slice(1);

    if (!this.hasSchemas(schema)) {
      throw new Error(`Unable to add validator ${type}`);
    }

    this.schemas[schema].prototype[name] = fn;
  }

  string() {
    return new this.schemas.String();
  }

  number() {
    return new this.schemas.Number();
  }

  array() {
    return new this.schemas.Array();
  }

  object() {
    return new this.schemas.Object();
  }
}

export default Validator;
