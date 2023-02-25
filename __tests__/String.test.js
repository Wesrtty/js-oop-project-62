import { describe, test, expect } from '@jest/globals';
import Validator from '../src/Validator.js';

describe('Validator String', () => {
  test('should handle default', () => {
    const validator = new Validator();
    const schema = validator.string();

    expect(schema.isValid('')).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid(undefined)).toBeTruthy();
    expect(schema.isValid('hexlet')).toBeTruthy();
  });

  test('should check "required" correctly', () => {
    const validator = new Validator();
    const schema = validator.string();

    schema.required();

    expect(schema.isValid('what does the fox say')).toBeTruthy();
    expect(schema.isValid('hexlet')).toBeTruthy();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid('')).toBeFalsy();
    expect(schema.isValid(undefined)).toBeFalsy();
  });

  test('should check "minLength" correctly', () => {
    const validator = new Validator();
    const schema = validator.string();

    expect(schema.minLength(3).isValid('he')).toBeFalsy();
    expect(schema.minLength(3).isValid('hex')).toBeTruthy();
    expect(schema.minLength(0).isValid('hexlet')).toBeTruthy();
  });

  test('should check "contains" correctly', () => {
    const validator = new Validator();
    const schema = validator.string();

    expect(schema.contains('does').isValid('what does zthe fox say')).toBeTruthy();
    expect(schema.contains(null).isValid('what does the fox say')).toBeFalsy();
    expect(schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
    expect(schema.isValid('what does the fox say')).toBeFalsy();
  });

  test('should validate correctly', () => {
    const validator = new Validator();
    const schema = validator.string();

    const result1 = schema
      .required()
      .minLength(10)
      .contains('say')
      .isValid('what does the fox say');
    expect(result1).toBeTruthy();

    const result2 = schema
      .minLength(50)
      .contains('does')
      .isValid('what does the fox say');
    expect(result2).toBeFalsy();
  });
});
