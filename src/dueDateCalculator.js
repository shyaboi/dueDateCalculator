// Constants
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 17;
const MINUTES_PER_HOUR = 60;

function calculateDueDate(submitTime, turnaroundTime) {
  validateInputs(submitTime, turnaroundTime);

  let dueDate = new Date(submitTime);
  let remainingHours = turnaroundTime;

  while (remainingHours > 0) {
    const currentHour = dueDate.getUTCHours();
    const currentMinutes = dueDate.getUTCMinutes();

    if (isWithinWorkHours(currentHour)) {
      const availableWorkMinutesToday = calculateAvailableMinutesToday(
        currentHour,
        currentMinutes
      );
      const remainingMinutes = remainingHours * MINUTES_PER_HOUR;

      if (remainingMinutes <= availableWorkMinutesToday) {
        addMinutesToDueDate(dueDate, remainingMinutes);
        remainingHours = 0;
      } else {
        addMinutesToDueDate(dueDate, availableWorkMinutesToday);
        remainingHours -= availableWorkMinutesToday / MINUTES_PER_HOUR;
      }
    }

    if (remainingHours > 0) {
      moveToNextWorkDay(dueDate);
    }
  }

  return dueDate;
}

function validateInputs(submitTime, turnaroundTime) {
  if (!(submitTime instanceof Date) || isNaN(submitTime.getTime())) {
    throw new Error("Submit time must be a valid date");
  }

  if (turnaroundTime < 0) {
    throw new Error("Turnaround time must be non-negative");
  }

  const submitHour = submitTime.getUTCHours();
  const submitDay = submitTime.getUTCDay();

  if (isWeekend(submitDay)) {
    throw new Error("Submit time must be on a working day (Monday to Friday)");
  }

  if (!isWithinWorkHours(submitHour)) {
    throw new Error("Submit time must be within working hours (9AM - 5PM)");
  }
}

function isWithinWorkHours(currentHour) {
  return currentHour >= WORK_START_HOUR && currentHour < WORK_END_HOUR;
}

function isWeekend(dayOfWeek) {
  return dayOfWeek === 6 || dayOfWeek === 0;
}

function calculateAvailableMinutesToday(currentHour, currentMinutes) {
  return (WORK_END_HOUR - currentHour) * MINUTES_PER_HOUR - currentMinutes;
}

function addMinutesToDueDate(dueDate, minutes) {
  dueDate.setUTCMinutes(dueDate.getUTCMinutes() + Math.round(minutes));
}

function moveToNextWorkDay(dueDate) {
  do {
    dueDate.setUTCDate(dueDate.getUTCDate() + 1);
  } while (isWeekend(dueDate.getUTCDay()));

  resetToStartOfWorkDay(dueDate);
}

function resetToStartOfWorkDay(dueDate) {
  dueDate.setUTCHours(WORK_START_HOUR, 0, 0, 0);
}

module.exports = {
  calculateDueDate,
};
