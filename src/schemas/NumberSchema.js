import Schema from '../Schema.js';

class NumberSchema extends Schema {
  required() {
    super.addOperation((number) => typeof number === 'number');
    return this;
  }

  positive() {
    super.addOperation((number) => number >= 0 || number === null);
    return this;
  }

  range(min, max) {
    super.addOperation((number) => number >= min && number <= max);
    return this;
  }
}

export default NumberSchema;
