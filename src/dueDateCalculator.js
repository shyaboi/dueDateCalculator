const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;

function calculateDueDate(submitTime, turnaroundTime) {
  let dueDate = new Date(submitTime);
  let remainingHours = turnaroundTime;

  while (remainingHours > 0) {
    const currentHour = dueDate.getUTCHours();
    const currentDay = dueDate.getUTCDay(); // Sunday = 0, Saturday = 6

    // Skip weekends
    if (currentDay === 0 || currentDay === 6) {
      dueDate.setUTCDate(dueDate.getUTCDate() + 1);
      dueDate.setUTCHours(WORK_START_HOUR); // Reset to 9:00 AM
      continue;
    }

    // If within working hours
    if (currentHour >= WORK_START_HOUR && currentHour < WORK_END_HOUR) {
      const availableHoursToday = WORK_END_HOUR - currentHour;

      if (remainingHours <= availableHoursToday) {
        dueDate.setUTCHours(currentHour + remainingHours);
        remainingHours = 0;
      } else {
        remainingHours -= availableHoursToday;
        dueDate.setUTCHours(WORK_END_HOUR); // End of the working day (5:00 PM)
      }
    }

    // Move to the next working day
    if (remainingHours > 0) {
      dueDate.setUTCDate(dueDate.getUTCDate() + 1);
      dueDate.setUTCHours(WORK_START_HOUR); // Reset to start of workday (9:00 AM)
    }
  }

  return dueDate;
}

module.exports = { calculateDueDate };
