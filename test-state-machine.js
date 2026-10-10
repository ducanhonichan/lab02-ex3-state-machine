
import {
  STATUS,
  createInitialState,
  createLoadingState,
  createSuccessState,
  createErrorState
} from './state-machine.js';

import assert from 'node:assert/strict';

// Test 1: IDLE
const idle = createInitialState();
assert.deepEqual(idle, { status: STATUS.IDLE });
console.log('PASS: IDLE state');

// Test 2: LOADING
const loading = createLoadingState();
assert.deepEqual(loading, { status: STATUS.LOADING });
console.log('PASS: LOADING state');

// Test 3: SUCCESS
const items = ['Review PR', 'Verify AST'];
const success = createSuccessState(items);

assert.deepEqual(success, {
  status: STATUS.SUCCESS,
  data: items
});
console.log('PASS: SUCCESS state');

// Test 4: ERROR
const error = createErrorState('Network connection failed');

assert.deepEqual(error, {
  status: STATUS.ERROR,
  error: 'Network connection failed'
});
console.log('PASS: ERROR state');

console.log('All 4 state machine tests passed!');

