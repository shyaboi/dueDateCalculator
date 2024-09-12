const { calculateDueDate } = require("../src/dueDateCalculator");
const assert = require("assert");

// Helper function to run tests
function runTest(submitTime, turnaroundTime, expectedDueDate) {
  const actualDueDate = calculateDueDate(submitTime, turnaroundTime);
  assert.strictEqual(
    actualDueDate.getTime(),
    expectedDueDate.getTime(),
    `Expected ${expectedDueDate}, but got ${actualDueDate}`
  );
  console.log("Test passed!");
}

// Test same-day turnaround within working hours
runTest(
  new Date(Date.UTC(2024, 8, 11, 9, 0)),
  8,
  new Date(Date.UTC(2024, 8, 11, 17, 0))
);

// Test for spilling over to the next working day
runTest(
  new Date(Date.UTC(2024, 8, 11, 16, 0)),
  2,
  new Date(Date.UTC(2024, 8, 12, 10, 0))
);

// Test for skipping weekend (start on Friday)
runTest(
  new Date(Date.UTC(2024, 8, 13, 16, 0)),
  8,
  new Date(Date.UTC(2024, 8, 16, 16, 0))
);
