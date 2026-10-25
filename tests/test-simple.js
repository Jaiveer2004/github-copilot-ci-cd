import { test } from 'node:test';
import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';

test('Basic assertion test', () => {
  ok(true, 'Should be truthy');
  strictEqual(1 + 1, 2, 'Math should work');
});

test('String test', () => {
  ok('hello'.includes('hello'), 'String should contain hello');
});

test('Array test', () => {
  const arr = [1, 2, 3];
  deepStrictEqual(arr.length, 3, 'Array should have 3 items');
  deepStrictEqual(arr[0], 1, 'First item should be 1');
});

test('Object test', () => {
  const obj = { name: 'Test', value: 42 };
  deepStrictEqual(obj.name, 'Test', 'Name should be Test');
  deepStrictEqual(obj.value, 42, 'Value should be 42');
});