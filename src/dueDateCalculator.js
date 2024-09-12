const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;

function calculateDueDate(submitTime, turnaroundTime) {
  validateInputs(submitTime, turnaroundTime);

  let dueDate = new Date(submitTime);
  let remainingHours = turnaroundTime;

  while (remainingHours > 0) {
    const currentHour = dueDate.getUTCHours();
    const currentDay = dueDate.getUTCDay(); // Sunday = 0, Saturday = 6

    // Skip weekends
    if (currentDay === 0 || currentDay === 6) {
      dueDate.setUTCDate(dueDate.getUTCDate() + 1);
      dueDate.setUTCHours(WORK_START_HOUR);
      continue;
    }

    if (currentHour >= WORK_START_HOUR && currentHour < WORK_END_HOUR) {
      const availableHoursToday = WORK_END_HOUR - currentHour;

      if (remainingHours <= availableHoursToday) {
        dueDate.setUTCHours(currentHour + remainingHours);
        remainingHours = 0;
      } else {
        remainingHours -= availableHoursToday;
        dueDate.setUTCHours(WORK_END_HOUR);
      }
    }

    if (remainingHours > 0) {
      dueDate.setUTCDate(dueDate.getUTCDate() + 1);
      dueDate.setUTCHours(WORK_START_HOUR);
    }
  }

  return dueDate;
}

function validateInputs(submitTime, turnaroundTime) {
  const currentHour = submitTime.getUTCHours();
  const currentDay = submitTime.getUTCDay();

  if (currentDay === 0 || currentDay === 6) {
    throw new Error("Submit time must be on a working day (Monday to Friday)");
  }

  if (currentHour < WORK_START_HOUR || currentHour >= WORK_END_HOUR) {
    throw new Error("Submit time must be within working hours (9AM - 5PM)");
  }

  if (turnaroundTime < 0) {
    throw new Error("Turnaround time must be non-negative");
  }
}

module.exports = { calculateDueDate };
