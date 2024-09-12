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
      const availableMinutesToday = calculateAvailableMinutesToday(currentHour, currentMinutes);
      const remainingMinutes = remainingHours * MINUTES_PER_HOUR;

      if (remainingMinutes <= availableMinutesToday) {
        addMinutesToDueDate(dueDate, remainingMinutes);
        remainingHours = 0;
      } else {
        addMinutesToDueDate(dueDate, availableMinutesToday);
        remainingHours -= availableMinutesToday / MINUTES_PER_HOUR;
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
    throw new Error("Invalid submit time");
  }
  if (turnaroundTime < 0) {
    throw new Error("Turnaround time must be non-negative");
  }
  if (!isWithinWorkHours(submitTime.getUTCHours())) {
    throw new Error("Submit time must be within working hours");
  }
}

function isWithinWorkHours(hour) {
  return hour >= WORK_START_HOUR && hour < WORK_END_HOUR;
}

function isWeekend(day) {
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

function calculateAvailableMinutesToday(hour, minutes) {
  return (WORK_END_HOUR - hour) * MINUTES_PER_HOUR - minutes;
}

function addMinutesToDueDate(dueDate, minutes) {
  dueDate.setUTCMinutes(dueDate.getUTCMinutes() + Math.round(minutes));
}

function moveToNextWorkDay(dueDate) {
  do {
    dueDate.setUTCDate(dueDate.getUTCDate() + 1);
  } while (isWeekend(dueDate.getUTCDay()));
  dueDate.setUTCHours(WORK_START_HOUR, 0, 0, 0);
}

module.exports = {
  calculateDueDate,
};
