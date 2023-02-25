import { describe, test, expect } from '@jest/globals';
import Validator from '../src/Validator.js';

describe('Object', () => {
  test('should check "shape" correctly', () => {
    const validator = new Validator();
    const schema = validator.object().shape({
      name: validator.string().required(),
      age: validator.number().positive(),
      friens: validator.array().required(),
    });

    expect(schema.isValid({ age: 100, name: 'kolya', friens: [] })).toBeTruthy();
    expect(schema.isValid({ name: 'maya', age: null })).toBeTruthy();
    expect(schema.isValid({ name: '', age: null })).toBeFalsy();
    expect(schema.isValid({ age: -5, name: 'ada', a: 1 })).toBeFalsy();
    expect(schema.isValid(null)).toBeTruthy();
  });
});
