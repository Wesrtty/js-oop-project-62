import { describe, test, expect } from '@jest/globals';
import Validator from '../src/Validator.js';

describe('Add new validator', () => {
  test('should validate correctly', () => {
    const validator1 = new Validator();
    const fn1 = (value, start) => value.startsWith(start);
    validator1.addValidator('string', 'startWith', fn1);

    const schema1 = validator1.string().test('startWith', 'H');

    expect(schema1.isValid('exlet')).toBeFalsy();
    expect(schema1.isValid('Hexlet')).toBeTruthy();
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
