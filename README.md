# Валидатор данных

[![Actions Status](https://github.com/Wesrtty/validator/workflows/hexlet-check/badge.svg)](https://github.com/Wesrtty/js-oop-project-62/actions)
[![Actions Status](https://github.com/Wesrtty/validator/actions/workflows/test.yml/badge.svg)](https://github.com/Wesrtty/js-oop-project-62/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/560d8a97c0c1fbb60f3a/maintainability)](https://codeclimate.com/github/Wesrtty/js-oop-project-62/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/560d8a97c0c1fbb60f3a/test_coverage)](https://codeclimate.com/github/Wesrtty/js-oop-project-62/test_coverage)

Валидатор данных – библиотека, с помощью которой можно проверять корректность любых данных. Подобных библиотек множество в каждом языке, так как практически все программы работают с внешними данными, которые нужно проверять на
 корректность. В первую очередь речь идет про данные форм заполняемых пользователями. За основу для проекта взята библиотека yup.

## Установка

```bash
$ make install
```

## Запуск тестов
```bash
$ make test
```

## Запуск линтера
```bash
$ make lint
```

## Примеры использования

### `string`

```js
const v = new Validator();

const schema = v.string();

schema.isValid(''); // true
schema.isValid(null) // true
schema.isValid(undefined) // true

schema.required();

schema.isValid('what does the fox say'); // true
schema.isValid('hexlet'); // true
schema.isValid(null); // false
schema.isValid(''); // false

schema.contains('what').isValid('what does the fox say'); // true
schema.contains('whatthe').isValid('what does the fox say'); // false
```

#### `string().required()`
Любая непустая строка.

#### `string().minLength(limit: number)`
Строка равна или длиннее указанного числа.

#### `string().contains(text: string)`
Строка содержит определённую подстроку.

----

### `number`

```js
const v = new Validator();

const schema = v.number();

schema.isValid(null); // true

schema.required();

schema.isValid(null); // false
schema.isValid(7); // true

schema.positive().isValid(10); // true

schema.range(-5, 5);

schema.isValid(-3); // false
schema.isValid(5); // true
```

#### `number().required()`
Любое число включая ноль.

#### `number().positive()`
Положительное число.

#### `number().range(min: number, max: number)`
Диапазон в который должны попадать числа включая границы.

----

#### `array`
```js
const v = new Validator();

const schema = v.array();

schema.isValid(null); // true

schema.required();

schema.isValid(null); // false
schema.isValid([]); // true
schema.isValid(['hexlet']); // true

schema.sizeof(2);

schema.isValid(['hexlet']); // false
schema.isValid(['hexlet', 'code-basics']); // true
```
#### `array().required()`
Объект является массивом.

#### `array().sizeof(length: number)`
Длина массива равна указанной.

----

#### `object`

```js
const v = new Validator();

const schema = v.object();

// Позволяет описывать валидацию для свойств объекта
schema.shape({
  name: v.string().required(),
  age: v.number().positive(),
});

schema.isValid({ name: 'kolya', age: 100 }); // true
schema.isValid({ name: 'maya', age: null }); // true
schema.isValid({ name: '', age: null }); // false
schema.isValid({ name: 'ada', age: -5 }); // false
```

#### `object().shape(fields: {})`
Определите ключи объекта и схемы для указанных ключей.
