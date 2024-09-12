function calculateDueDate(submitTime, turnaroundTime) {
  const dueDate = new Date(submitTime);
  dueDate.setHours(dueDate.getHours() + turnaroundTime);
  return dueDate;
}

module.exports = { calculateDueDate };
