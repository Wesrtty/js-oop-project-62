import * as schemas from './schemas/index.js';

class Validator {
  addValidator(type, name, fn) {
    const schemasWithLowerCase = Object
      .entries(schemas)
      .reduce((acc, [schemaName, className]) => {
        const newName = schemaName.toLowerCase().replace('schema', '');
        return { ...acc, [newName]: className };
      }, {});

    if (!schemasWithLowerCase[type]) {
      throw new Error(`Unable to add validator ${type}`);
    }

    schemasWithLowerCase[type].prototype[name] = fn;
  }

  string() {
    return new schemas.StringSchema();
  }

  number() {
    return new schemas.NumberSchema();
  }

  array() {
    return new schemas.ArraySchema();
  }

  object() {
    return new schemas.ObjectSchema();
  }
}

export default Validator;
