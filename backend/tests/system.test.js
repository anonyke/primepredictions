import assert from 'node:assert/strict';
import { evaluatePrediction } from '../services/resultEngine.js';

console.log('--- Running Prediction Result Engine System Tests ---');

// Test 1: 1X2 Market Home Win
{
  const res = evaluatePrediction('1X2', '1', 2, 0, 'FINISHED');
  assert.equal(res.outcome, 'WIN', '1X2 2-0 with pick 1 should WIN');
}

// Test 2: 1X2 Market Draw (Home picked -> LOSS)
{
  const res = evaluatePrediction('1X2', '1', 1, 1, 'FINISHED');
  assert.equal(res.outcome, 'LOSS', '1X2 1-1 with pick 1 should LOSS');
}

// Test 3: Over/Under 2.5 (3 goals -> WIN)
{
  const res = evaluatePrediction('Over/Under', 'Over 2.5', 2, 1, 'FINISHED');
  assert.equal(res.outcome, 'WIN', 'Over 2.5 with 3 goals should WIN');
}

// Test 4: Over/Under 2.5 (2 goals -> LOSS)
{
  const res = evaluatePrediction('Over/Under', 'Over 2.5', 1, 1, 'FINISHED');
  assert.equal(res.outcome, 'LOSS', 'Over 2.5 with 2 goals should LOSS');
}

// Test 5: BTTS Yes (1-1 -> WIN)
{
  const res = evaluatePrediction('BTTS', 'YES', 1, 1, 'FINISHED');
  assert.equal(res.outcome, 'WIN', 'BTTS Yes with 1-1 should WIN');
}

// Test 6: BTTS Yes (2-0 -> LOSS)
{
  const res = evaluatePrediction('BTTS', 'YES', 2, 0, 'FINISHED');
  assert.equal(res.outcome, 'LOSS', 'BTTS Yes with 2-0 should LOSS');
}

// Test 7: Postponed match
{
  const res = evaluatePrediction('1X2', '1', null, null, 'POSTPONED');
  assert.equal(res.outcome, 'POSTPONED', 'Match status POSTPONED should return POSTPONED');
}

console.log('✅ All Result Engine unit tests passed successfully.');
