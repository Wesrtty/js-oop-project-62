import { describe, test, expect } from '@jest/globals';
import Validator from '../src/Validator.js';

describe('Add new validator', () => {
  test('should validate correctly', () => {
    const validator = new Validator();
    const fn = (value, start) => value.startsWith(start);
    validator.addValidator('string', 'startWith', fn);

    const schema = validator.string().test('startWith', 'H');

    expect(schema.isValid('exlet')).toBeFalsy();
    expect(schema.isValid('Hexlet')).toBeTruthy();
  });

  test('should validate correctly', () => {
    const validator = new Validator();
    const fn = (value, min) => value >= min;
    validator.addValidator('number', 'min', fn);

    const schema = validator.number().test('min', 5);

    expect(schema.isValid(4)).toBeFalsy();
    expect(schema.isValid(6)).toBeTruthy();
  });

  test('should throw error when validator not found', () => {
    const validator = new Validator();

    expect(() => validator.number().test('abs', 5)).toThrow();
  });

  test('should throw error when no validator added', () => {
    const validator = new Validator();
    const fn = (value, start) => value.startsWith(start);

    expect(() => validator.addValidator('random_123', 'startWith', fn)).toThrow();
  });
});
