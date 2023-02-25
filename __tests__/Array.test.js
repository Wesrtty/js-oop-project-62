import { describe, test, expect } from '@jest/globals';
import Validator from '../src/Validator.js';

describe('Validator Array', () => {
  test('should handle default', () => {
    const validator = new Validator();
    const schema = validator.array();

    expect(schema.isValid('')).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid(undefined)).toBeTruthy();
    expect(schema.isValid([])).toBeTruthy();
  });

  test('should check "required" correctly', () => {
    const validator = new Validator();
    const schema = validator.array().required();

    expect(schema.isValid('')).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid(undefined)).toBeFalsy();
    expect(schema.isValid(0)).toBeFalsy();
    expect(schema.isValid({})).toBeFalsy();

    expect(schema.isValid([])).toBeTruthy();
    expect(schema.isValid([1, 2])).toBeTruthy();
  });

  test('should check "sizeof" correctly', () => {
    const validator = new Validator();
    const schema = validator.array().sizeof(2);

    expect(schema.isValid([1, 2])).toBeTruthy();
    expect(schema.isValid([[], [], []])).toBeFalsy();
    expect(schema.isValid([])).toBeFalsy();
  });

  test('should validate correctly', () => {
    const validator = new Validator();
    const schema = validator.array();

    expect(schema.required().sizeof(1).isValid([1])).toBeTruthy();
    expect(schema.sizeof(1).isValid([])).toBeFalsy();
  });
});
