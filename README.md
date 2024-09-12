# Due Date Calculator

## Description

This project is a **Due Date Calculator** that calculates the expected resolution time of issues reported during working hours. It takes into account business hours, weekends, and the turnaround time provided.

This solution follows **Clean Code** principles, with a focus on clarity, maintainability, and testability. The code is written in a modular fashion and includes unit tests to validate the accuracy of the due date calculation.

---

## Problem Statement

The problem involves calculating the due date for an issue based on its submission time and the turnaround time in working hours. The rules are as follows:

- Working hours are from **9 AM to 5 PM**, Monday to Friday.
- Weekends (Saturday and Sunday) are not considered as working days.
- A problem can only be reported during working hours.
- Turnaround time is provided in working hours (e.g., 2 days equals 16 hours).

For example:

- If an issue is reported at **2:12 PM on Tuesday** with a turnaround time of **16 hours**, the due date would be **2:12 PM on Thursday**.

---

## Implementation

The main logic is implemented in the `calculateDueDate` function, located in `dueDateCalculator.js`. This function handles the following tasks:

- Validates working hours and processes turnaround time accordingly.
- Skips weekends when necessary.
- Accurately calculates the due date based on the turnaround time.

---

## Getting Started

### Prerequisites

- **Node.js** (v12 or higher)
- A terminal or command prompt

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/shyaboi/dueDateCalculator.git
   cd dueDateCalculator
```

Install [node.js](https://nodejs.org/en/download/package-manager) (if not on computer)


# Tests

This project includes a suite of automated tests to verify the accuracy of the calculateDueDate function. The tests are located in the tests/dueDateCalculator.test.js file and cover various scenarios, such as:

- Issues reported at the start or end of a working day.
- Multi-day turnaround times.
- Turnaround times spanning weekends.
- Running the Tests

To run the tests, execute the following command in the terminal:

```bash
npm run test
```

All tests will run, and results will be displayed in the console.

example output:

```bash
 npm run test

> due-date-calculator@1.0.0 test
> node tests/dueDateCalculator.test.js

Starting DueDateCalculator Tests
Test 1: 8-hour turnaround passed
Test 2: End-of-day submission passed
Test 3: Tiny turnaround time right before 5PM passed
Test 4: 16-hour turnaround spanning multiple days passed
Test 5: 24-hour turnaround starting at 4:00 PM on Friday passed
Test 6: 40-hour turnaround starting at 4:00 PM on Friday passed
Test 7: Invalid submission time (before 9AM) passed
Test 8: Tiny turnaround time right before 5PM passed
Test 9: Large turnaround time passed
All tests complete.
```

## Project Structure

- `src/dueDateCalculator.js`: Contains the main logic for calculating the due date.

- `tests/dueDateCalculator.test.js`: Unit tests for validating the correctness of the calculateDueDate function.

- `package.json`: A typical setup and config file for node.js projects.

- `README.me`: A typical README file with use cases and examples of the code in the application.

# Example Usage

If you want to use the funciton in another file, you can do so like the example below:

```javascript
const { calculateDueDate } = require("./dueDateCalculator");

const submissionDate = new Date(Date.UTC(2024, 8, 11, 9, 0)); // September 11, 2024, 9:00 AM (UTC)
const turnaroundTime = 16; // 16 hours (2 working days)

const dueDate = calculateDueDate(submissionDate, turnaroundTime);
console.log(`Calculated Due Date: ${dueDate}`);
```

Output:

```bash
Calculated Due Date: Mon Sep 16 2024 12:00:00 GMT+0000 (UTC)
```

# Due Date Calculator Instructions

Thanks for handing in your application to a developer position at Emarsys. With this brief exercise we would like to assess your skills and capabilities on how you can implement algorithms and write production codes.
The problem
We are looking for a solution that implements a due date calculator in an issue tracking system. Your task is to implement the CalculateDueDate method:

- Input: Takes the submit date/time and turnaround time.
- Output: Returns the date/time when the issue is resolved.
  Rules
- Working hours are from 9AM to 5PM on every working day, Monday to Friday.
- Holidays should be ignored (e.g. A holiday on a Thursday is considered as a working day. A working Saturday counts as a non-working day.).
- The turnaround time is defined in working hours (e.g. 2 days equal 16 hours). If a problem was reported at 2:12PM on Tuesday and the turnaround time is 16 hours, then it is due by 2:12PM on Thursday.
- A problem can only be reported during working hours. (e.g. All submit date values are set between 9AM to 5PM.)
- Do not use any third-party libraries for date/time calculations (e.g. Moment.js, Carbon, Joda, etc.) or hidden functionalities of the built-in methods.
  Additional info

- Use your favourite programming language.
- Do not implement the user interface or CLI.
- Do not write a pseudo code. Write a code that you would commit/push to a repository and which solves the given problem.
- You have 24 hours to submit your solution.
- You can submit your solution even if you have not finished it fully.
  Bonus – Not mandatory
- Including automated tests to your solution is a plus.
- Test-driven (TDD) solutions are especially welcome.
- Clean Code (by Robert. C. Martin) makes us happy.
  Homework
