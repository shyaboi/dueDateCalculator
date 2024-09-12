const { calculateDueDate } = require("./dueDateCalculator");

const submissionDate = new Date(Date.UTC(2024, 8, 11, 9, 0));
const turnaroundTimeInHours = 16;

const dueDate = calculateDueDate(submissionDate, turnaroundTimeInHours);
console.log(`Submission Date: ${submissionDate}`);
console.log(`Turnaround Time: ${turnaroundTimeInHours} hours`);
console.log(`Calculated Due Date: ${dueDate}`);
