import { describe, test, expect } from '@jest/globals';
import Validator from '../src/Validator.js';

describe('Validator Number', () => {
  test('should handle default', () => {
    const validator = new Validator();
    const schema = validator.number();

    expect(schema.isValid('')).toBeTruthy();
    expect(schema.isValid(null)).toBeTruthy();
    expect(schema.isValid(undefined)).toBeTruthy();
    expect(schema.isValid(5)).toBeTruthy();
    expect(schema.isValid('one')).toBeTruthy();
  });

  test('should check "required" correctly', () => {
    const validator = new Validator();
    const schema = validator.number().required();

    expect(schema.isValid('one')).toBeFalsy();
    expect(schema.isValid('')).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid(undefined)).toBeFalsy();
    expect(schema.isValid('5')).toBeFalsy();

    expect(schema.isValid(7)).toBeTruthy();
    expect(schema.isValid(0)).toBeTruthy();
  });

  test('should check "positive" correctly', () => {
    const validator = new Validator();
    const schema = validator.number();

    expect(schema.positive().isValid('')).toBeFalsy();
    expect(schema.positive().isValid(null)).toBeFalsy();
    expect(schema.positive().isValid(7)).toBeTruthy();
    expect(schema.positive().isValid(0)).toBeFalsy();
    expect(schema.positive().isValid('25')).toBeTruthy();

    expect(schema.positive().isValid(-1)).toBeFalsy();
    expect(schema.positive().isValid('-1')).toBeFalsy();
  });

  test('should check "range" correctly', () => {
    const validator = new Validator();
    const schema = validator.number();

    expect(schema.range(-5, 5).isValid(-5)).toBeTruthy();
    expect(schema.range(0, 0).isValid(0)).toBeTruthy();
    expect(schema.range('0', 2).isValid(0)).toBeTruthy();

    expect(schema.range(-5, 5).isValid(-6)).toBeFalsy();
    expect(schema.range(0, 0).isValid(1)).toBeFalsy();
    expect(schema.range('one', 'two').isValid(1)).toBeFalsy();
  });

  test('should validate correctly', () => {
    const validator = new Validator();
    const schema = validator.number().required();

    expect(schema.positive().range(-5, 5).isValid(-3)).toBeFalsy();
    expect(schema.positive().range(-5, 5).isValid(1)).toBeTruthy();
  });
});
