const { calculateDueDate } = require("../src/dueDateCalculator");
const assert = require("assert");

function areDatesEqualToMinute(actual, expected) {
  return actual.getTime() === expected.getTime();
}

function runTest(submitTime, turnaroundTime, expectedDueTime, description) {
  try {
    const actualDueTime = calculateDueDate(submitTime, turnaroundTime);
    assert(
      areDatesEqualToMinute(actualDueTime, expectedDueTime),
      `${description} failed`
    );
    console.log(`${description} passed`);
  } catch (error) {
    console.error(`${description} failed - Error: ${error.message}`);
  }
}

function runTestWithValidation(
  submitTime,
  turnaroundTime,
  expectedMessage,
  description
) {
  try {
    calculateDueDate(submitTime, turnaroundTime);
    // If no error is thrown, the test failed because we expected an invalid input error
    console.error(
      `${description} failed: Expected validation error, but got a valid result.`
    );
  } catch (error) {
    if (error.message === expectedMessage) {
      console.log(`${description} passed`);
    } else {
      console.error(
        `${description} failed - Unexpected error message: ${error.message}`
      );
    }
  }
}

console.log("Starting DueDateCalculator Tests");

runTest(
  new Date(Date.UTC(2024, 8, 11, 9, 0)),
  8,
  new Date(Date.UTC(2024, 8, 11, 17, 0)),
  "Test 1: 8-hour turnaround"
);

runTest(
  new Date(Date.UTC(2024, 8, 11, 16, 30)),
  0.5,
  new Date(Date.UTC(2024, 8, 11, 17, 0)),
  "Test 2: End-of-day submission"
);

runTest(
  new Date(Date.UTC(2024, 8, 13, 12, 59)),
  0.01,
  new Date(Date.UTC(2024, 8, 13, 13, 0)),
  "Test 3: Tiny turnaround time right before 5PM"
);

runTest(
  new Date(Date.UTC(2024, 8, 13, 12, 0)),
  16,
  new Date(Date.UTC(2024, 8, 17, 12, 0)),
  "Test 4: 16-hour turnaround spanning multiple days"
);

runTest(
  new Date(Date.UTC(2024, 8, 13, 16, 0)),
  24,
  new Date(Date.UTC(2024, 8, 18, 16, 0)),
  "Test 5: 24-hour turnaround starting at 4:00 PM on Friday"
);

runTest(
  new Date(Date.UTC(2024, 8, 13, 16, 0)),
  40,
  new Date(Date.UTC(2024, 8, 20, 16, 0)),
  "Test 6: 40-hour turnaround starting at 4:00 PM on Friday"
);

runTestWithValidation(
  new Date(Date.UTC(2024, 8, 11, 1, 0)),
  8,
  "Submit time must be within working hours (9AM - 5PM)",
  "Test 7: Invalid submission time (before 9AM)"
);

runTest(
  new Date(Date.UTC(2024, 8, 13, 12, 59)),
  0.01,
  new Date(Date.UTC(2024, 8, 13, 13, 0)),
  "Test 8: Tiny turnaround time right before 5PM"
);

runTest(
  new Date(Date.UTC(2024, 8, 13, 13, 0)),
  160,
  new Date(Date.UTC(2024, 9, 11, 13, 0)),
  "Test 9: Large turnaround time"
);

console.log("All tests complete.");
