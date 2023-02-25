class Schema {
  constructor(operations) {
    this.operations = operations ?? [];
  }

  getOperations() {
    return this.operations.slice();
  }

  addOperation(fn) {
    this.operations.push(fn);
  }

  test(name, value) {
    const fn = this.constructor.prototype[name];

    if (!fn) {
      throw new Error(`Validator ${name} not found`);
    }

    this.addOperation((text) => fn(text, value));
    return this;
  }

  isValid(text) {
    return this.getOperations().every((fn) => fn(text));
  }
}

export default Schema;
