const { calculateDueDate } = require("../src/dueDateCalculator");
const assert = require("assert");

// Simple test case
function runTest(submitTime, turnaroundTime, expectedDueDate) {
  const actualDueDate = calculateDueDate(submitTime, turnaroundTime);
  assert.strictEqual(
    actualDueDate.getTime(),
    expectedDueDate.getTime(),
    `Expected ${expectedDueDate}, but got ${actualDueDate}`
  );
  console.log("Test passed!");
}

// Test case
runTest(new Date("2024-09-11T09:00:00Z"), 8, new Date("2024-09-11T17:00:00Z"));
