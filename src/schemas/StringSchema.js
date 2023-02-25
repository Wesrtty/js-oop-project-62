import Schema from '../Schema.js';

class StringSchema extends Schema {
  required() {
    super.addOperation((text) => Boolean(text));
    return this;
  }

  minLength(limit) {
    super.addOperation((text) => text.length >= limit);
    return this;
  }

  contains(str) {
    super.addOperation((text) => text.includes(str));
    return this;
  }
}

export default StringSchema;
