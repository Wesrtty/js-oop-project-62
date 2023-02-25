import Schema from '../Schema.js';

class ArraySchema extends Schema {
  required() {
    super.addOperation((arr) => Array.isArray(arr));
    return this;
  }

  sizeof(length) {
    super.addOperation((arr) => arr.length === length);
    return this;
  }
}

export default ArraySchema;
